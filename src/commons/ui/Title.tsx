const Title = ({ title, size = "text-2xl"}: { title: string, size?: string}) => {
    return (
      <>
      <h1
        style={{ fontFamily: "Plus Jakarta Sans" }}
        className={`pt-[75px] text-center ${size} font-semibold text-blue-950`}
      >
        {title}
      </h1>
      </>
    );
  };
  
  export default Title;
  