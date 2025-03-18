import { FC, useState } from 'react';
import LogSheetSvg from './LogSheetSvg';

const ELDLog: FC<any> = ({logs}) => {

  //const location = useLocation();
  //const  logs  = location.state || {};
    
  const [selectedLogIndex, setSelectedLogIndex] = useState(0);

  if (!logs || logs.length === 0) {
    return (
      <div className="eld-logs empty">
        <p>No ELD logs available</p>
      </div>
    );
  }

  const sortedLogs = [...logs].sort((a, b) => 
    new Date(a.date).getTime() - new Date(b.date).getTime()
  );

  const formatDate = (dateStr: any) => {
    return new Date(dateStr).toLocaleDateString();
  };

  return (
    <div className="eld-logs">
      <div className="log-selector">
        <h2>ELD Logs</h2>
       {/*  <div className="log-tabs">
           <CustomSelect options={sortedLogs.map((log, index) => {return {key: index, name: formatDate(log.date)} })} onChange={setSelectedLogIndex} />
        </div> */}
      </div>
      
      <div className="log-content">
        {sortedLogs[selectedLogIndex] && (
          <LogSheetSvg logData={sortedLogs[selectedLogIndex].log_data} sortedLogs={sortedLogs} onDateChange={setSelectedLogIndex}  />
        )}
      </div>
    </div>
  );
};

export default ELDLog;