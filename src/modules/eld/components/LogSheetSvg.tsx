import { useEffect, useRef } from "react";
import { EldLog, LogEvent } from "../../../interfaces/eld-log";
import CustomSelect from "../../../commons/ui/CustomSelect";

const LogSheetSvg = ({
  logData,
  sortedLogs,
  onDateChange,
}: {
  logData: EldLog;
  sortedLogs: any;
  onDateChange: any;
}) => {
  const svgRef = useRef<SVGSVGElement | null>(null);

  const statusCodes: {
    [key: string]: { label: string; color: string; y: number };
  } = {
    OFF: { label: "OFF DUTY", color: "#FFFFFF", y: 25 },
    SB: { label: "SLEEPER BERTH", color: "#FFDF00", y: 70 },
    D: { label: "DRIVING", color: "#FF6961", y: 115 },
    ON: { label: "ON DUTY (NOT DRIVING)", color: "#A7C7E7", y: 160 },
  };

  useEffect(() => {
    if (!svgRef.current || !logData) return;
  }, [logData]);

  const sortEvents = (events: LogEvent[]) => {
    if (!events || events.length === 0) return [];

    return [...events].sort((a, b) => {
      const timeA = a.time.split(":").map(Number);
      const timeB = b.time.split(":").map(Number);
      return timeA[0] * 60 + timeA[1] - (timeB[0] * 60 + timeB[1]);
    });
  };

  // Draw SVG elements instead of canvas
  const renderSvgGrid = () => {
    const width = 900;
    const height = 300;
    const timeColWidth = (width - 100) / 24;

    // Create grid lines
    const gridLines = [];

    // Horizontal status section lines
    const statusSections = Object.values(statusCodes);
    for (let i = 1; i < statusSections.length; i++) {
      const y = statusSections[i].y;
      gridLines.push(
        <line
          key={`h-line-${i}`}
          x1={50}
          y1={y}
          x2={width - 50}
          y2={y}
          stroke="#000000"
          strokeWidth={1}
        />
      );
    }

    // Vertical time lines
    for (let i = 0; i <= 24; i++) {
      const x = 50 + i * timeColWidth;
      gridLines.push(
        <line
          key={`v-line-${i}`}
          x1={x}
          y1={10}
          x2={x}
          y2={height - 110}
          stroke="#000000"
          strokeWidth={1}
        />
      );

      // Hour labels
      if (i < 24) {
        gridLines.push(
          <text
            key={`hour-${i}`}
            x={x + timeColWidth / 2}
            y={height - 95}
            textAnchor="middle"
            fontSize="10px"
          >{`${i}:00`}</text>
        );
      }
    }

    // Status labels
    Object.entries(statusCodes).forEach(([code, status]) => {
      const y = status.y;
      const nextY =
        Object.values(statusCodes).find((s) => s.y > y)?.y || height - 110;
      const midY = y + (nextY - y) / 2;

      gridLines.push(
        <text
          key={`status-${code}`}
          x={45}
          y={midY}
          textAnchor="end"
          fontSize="10px"
        >
          {status.label}
        </text>
      );
    });

    return (
      <>
        {/* Border */}
        <rect
          x={50}
          y={10}
          width={width - 100}
          height={height - 120}
          stroke="#000000"
          strokeWidth={1}
          fill="none"
        />
        {gridLines}
      </>
    );
  };

  const renderSvgEvents = () => {
    if (!logData?.events || logData.events.length === 0) return null;

    const width = 500;
    const timeColWidth = (width - 100) / 24;
    const sortedEvents = sortEvents(logData.events);
    const elements = [];

    // Draw lines between events
    for (let i = 0; i < sortedEvents.length - 1; i++) {
      const currentEvent = sortedEvents[i];
      const nextEvent = sortedEvents[i + 1];

      const currentTime = currentEvent.time.split(":").map(Number);
      const nextTime = nextEvent.time.split(":").map(Number);

      const currentX =
        50 + ((currentTime[0] * 60 + currentTime[1]) / 60) * timeColWidth;
      const nextX = 50 + ((nextTime[0] * 60 + nextTime[1]) / 60) * timeColWidth;

      const currentY = statusCodes[currentEvent.status].y;
      const nextY = statusCodes[nextEvent.status].y;

      // Horizontal line at current status
      elements.push(
        <line
          key={`h-event-${i}`}
          x1={currentX}
          y1={currentY}
          x2={nextX}
          y2={currentY}
          stroke={statusCodes[currentEvent.status].color}
          strokeWidth={3}
        />
      );

      // Vertical line to next status
      elements.push(
        <line
          key={`v-event-${i}`}
          x1={nextX}
          y1={currentY}
          x2={nextX}
          y2={nextY}
          stroke="#000000"
          strokeWidth={1}
        />
      );
    }

    // Draw event markers
    sortedEvents.forEach((event, index) => {
      const time = event.time.split(":").map(Number);
      const x = 50 + ((time[0] * 60 + time[1]) / 60) * timeColWidth;
      const y = statusCodes[event.status].y;

      // Circle at event point
      elements.push(
        <circle key={`point-${index}`} cx={x} cy={y} r={5} fill="#000000" />
      );

      // Time label
      elements.push(
        <text
          key={`time-${index}`}
          x={x}
          y={y - 10}
          textAnchor="middle"
          fontSize="10px"
        >
          {event.time}
        </text>
      );
    });

    return elements;
  };

  const renderSvgHeader = () => {
    if (!logData) return null;

    const width = 900;
    const height = 300;

    return (
      <>
        <text x={50} y={height - 80} fontSize="12px">{`Driver: ${
          logData.driver_name || "N/A"
        }`}</text>
        <text x={50} y={height - 65} fontSize="12px">{`Carrier: ${
          logData.carrier || "N/A"
        }`}</text>
        <text x={50} y={height - 50} fontSize="12px">{`Truck #: ${
          logData.truck_number || "N/A"
        }`}</text>
        <text x={50} y={height - 35} fontSize="12px">{`Trailer #: ${
          logData.trailer_numbers || "N/A"
        }`}</text>

        <text
          x={width - 50}
          y={height - 80}
          textAnchor="end"
          fontSize="12px"
        >{`Date: ${new Date(logData.date).toLocaleDateString()}`}</text>
        <text
          x={width - 50}
          y={height - 65}
          textAnchor="end"
          fontSize="12px"
        >{`Shipping Doc: ${logData.shipping_doc || "N/A"}`}</text>
      </>
    );
  };

  const renderSvgSummary = () => {
    if (!logData?.hours_summary) return null;

    const width = 500;
    const height = 300;
    const summary = logData.hours_summary;

    return (
      <>
        <text x={width - 200} y={height - 35} fontSize="12px">
          Hours Summary:
        </text>
        <text
          x={width - 200}
          y={height - 20}
          fontSize="12px"
        >{`Drive: ${summary.driving}h`}</text>
        <text
          x={width - 120}
          y={height - 20}
          fontSize="12px"
        >{`On Duty: ${summary.on_duty_not_driving}h`}</text>
        <text
          x={width - 200}
          y={height - 5}
          fontSize="12px"
        >{`SB: ${summary.sleeper_berth}h`}</text>
        <text
          x={width - 120}
          y={height - 5}
          fontSize="12px"
        >{`Off Duty: ${summary.off_duty}h`}</text>
      </>
    );
  };

  return (
    <div className="log-sheet">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-bold">Driver's Daily Log</h3>
        <CustomSelect
          options={sortedLogs.map((log: any, index: number) => {
            return {
              key: index,
              name: new Date(log.date).toLocaleDateString(),
            };
          })}
          onChange={onDateChange}
        />
      </div>
      <hr className="border-0 h-px bg-gradient-to-r from-transparent to-gray-200 my-3" />

      <div className="bg-gray-50  p-4 rounded border border-gray-200 mb-4">
        <div className="log-sheet-info bg-gray-50 p-4 rounded border border-gray-200 mb-4">
          <h4 className="text-lg font-semibold mb-2">Driver Information</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            <p>
              <strong>Driver:</strong> {logData?.driver_name || "N/A"}
            </p>
            <p>
              <strong>Carrier:</strong> {logData?.carrier || "N/A"}
            </p>
            <p>
              <strong>Truck #:</strong> {logData?.truck_number || "N/A"}
            </p>
            <p>
              <strong>Trailer #:</strong> {logData?.trailer_numbers || "N/A"}
            </p>
          </div>
        </div>

        {logData?.hours_summary && (
          <div className="hours-summary bg-[#008080]/10 p-4 rounded border-0} mb-4">
            <h4 className="text-lg font-semibold mb-2">Hours Summary</h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div
                className="p-2 text-center rounded"
                style={{
                  backgroundColor: statusCodes["D"].color,
                  border: "1px solid #ccc",
                }}
              >
                <p className="font-semibold">{statusCodes["D"].label}</p>
                <p className="text-xl">{logData.hours_summary.driving}h</p>
              </div>
              <div
                className="p-2 text-center rounded"
                style={{
                  backgroundColor: statusCodes["ON"].color,
                  border: "1px solid #ccc",
                }}
              >
                <p className="font-semibold">{statusCodes["ON"].label}</p>
                <p className="text-xl">
                  {logData.hours_summary.on_duty_not_driving}h
                </p>
              </div>
              <div
                className="p-2 text-center rounded"
                style={{
                  backgroundColor: statusCodes["SB"].color,
                  border: "1px solid #ccc",
                }}
              >
                <p className="font-semibold">{statusCodes["SB"].label}</p>
                <p className="text-xl">
                  {logData.hours_summary.sleeper_berth}h
                </p>
              </div>
              <div
                className="p-2 text-center rounded"
                style={{
                  backgroundColor: statusCodes["OFF"].color,
                  border: "1px solid #ccc",
                }}
              >
                <p className="font-semibold">{statusCodes["OFF"].label}</p>
                <p className="text-xl">{logData.hours_summary.off_duty}h</p>
              </div>
            </div>
          </div>
        )}

        <div className="events-section">
          <h4 className="text-lg font-semibold mb-2">Events</h4>
          <div className="overflow-x-auto">
            <table className="events-table w-full border-collapse mb-4">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border p-2 text-left">Time</th>
                  <th className="border p-2 text-left">Status</th>
                  <th className="border p-2 text-left">Location</th>
                </tr>
              </thead>
              <tbody>
                {logData?.events &&
                  sortEvents(logData.events).map((event, index) => (
                    <tr
                      key={index}
                      className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
                    >
                      <td className="border p-2">{event.time}</td>
                      <td className="border p-2">
                        <span
                          className="inline-block w-3 h-3 rounded-full mr-2"
                          style={{
                            backgroundColor: statusCodes[event.status].color,
                            border: "1px solid #000",
                          }}
                        ></span>
                        {statusCodes[event.status].label}
                      </td>
                      <td className="border p-2">{event.location || "N/A"}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div className="canvas-container flex justify-center">
        <svg
          ref={svgRef}
          height={300}
          style={{
            border: "1px solid #ccc",
            width: "100%",
            height: "auto",
            backgroundColor: "#FFFFFF",
          }}
        >
          {renderSvgGrid()}
          {renderSvgEvents()}
          {renderSvgHeader()}
          {renderSvgSummary()}
        </svg>
      </div>
    </div>
  );
};
export default LogSheetSvg;
