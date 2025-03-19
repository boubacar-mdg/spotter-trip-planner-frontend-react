import { FC, useState } from 'react';
import LogSheetSvg from './LogSheetSvg';

const ELDLog: FC<{logs: any}> = ({logs}) => {
    
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


  return (
    <div className="eld-logs">
      <div className="log-selector">
        <h2>ELD Logs</h2>
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