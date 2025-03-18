import { Dispatch, ReactNode, SetStateAction } from "react";
import { ChevronDown } from "lucide-react";
import Select from "antd/es/select";

function SearchInput({
  title,
  separator,
  placeholder,
  onChange,
  dropdown = false,
  options,
  enableBorder = false,
  backgroundColor = "",
  value,
  type = "text",
  customInput,
}: {
  title: string;
  separator: boolean;
  dropdown?: boolean;
  placeholder: string;
  onChange: Dispatch<SetStateAction<string>>;
  options?: { value: string; label: string }[];
  enableBorder?: boolean;
  backgroundColor?: string;
  value?: any;
  type?: string;
  customInput?: ReactNode;
}) {
  const onSelect = (value: string) => {
    onChange(value);
    console.log(`selected ${value}`);
  };

  return (
    <div
      className={`flex flex-col lg:flex-row ${
        enableBorder ? "border border-gray-500/20 rounded-lg" : ""
      } ${backgroundColor} flex-1 justify-between items-center hover:opacity-70 transition`}
      style={{ fontFamily: "Plus Jakarta Sans" }}
    >
      {customInput ? (
        <div className="w-full relative">
          <div className="h-[60px] flex-col pt-1">
            <div className="text-black text-[12.5px] px-3 py-2 font-medium">
              {title}
            </div>
            {customInput}
          </div>
        </div>
      ) : dropdown ? (
        <div className="w-full relative">
          <div className="h-[72px] flex-col pt-1">
            <div className="text-black text-[12.5px] px-3 py-2 font-medium">
              {title}
            </div>

            <Select
              className="w-full cursor-pointer font-medium text-[14px] "
              style={{ fontFamily: "Plus Jakarta Sans" }}
              showSearch
              placeholder={placeholder}
              optionFilterProp="label"
              onChange={onSelect}
              variant="borderless"
              suffixIcon={<></>}
              options={options}
              value={value || null}
            />
          </div>

          <ChevronDown
            className="absolute top-[45px] right-[11px] z-50"
            size={18}
            color="#536280"
          />
        </div>
      ) : (
        <div className="w-full relative">
          <div className="h-[60px] flex-col pt-1">
            <div className="text-black text-[12.5px] px-3 py-2 font-medium">
              {title}
            </div>
            <input
              type={type}
              className="w-full  border-0 rounded-lg px-3 text-[14px] outline-none font-medium placeholder:font-medium placeholder:text-[14px] "
              placeholder={placeholder}
              value={value || undefined}
              onChange={(e) => onChange(e.target.value)}
            />
          </div>
        </div>
      )}
      {separator && (
        <div className="h-[1px] lg:h-[60px] w-full lg:w-[1px] bg-gray-300/60"></div>
      )}
    </div>
  );
}

export default SearchInput;
