import LoadingOutlined from "@ant-design/icons/lib/icons/LoadingOutlined";
import { Spin } from "antd";
import { motion } from "framer-motion";
import React from "react";

interface SimpleButtonProps {
  type: "button" | "submit" | "reset";
  disabled?: boolean;
  title: string;
  loading?: boolean;
  py?: number;
  color?: string;
}

const SimpleButton: React.FC<SimpleButtonProps> = ({
  type,
  disabled,
  title,
  loading = false,
  py = 18,
  color = '#008080'
}) => {
  return (
    <>
      <div className="mt-1">
        <motion.button
          whileTap={{ scale: 0.993 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
          type={type}
          disabled={disabled}
          className={`flex w-full justify-center items-center rounded-md bg-[${color}] hover:opacity-90 px-6 py-3 text-xs font-semibold leading-4 text-white shadow-sm gap-3 cursor-pointer`}
          style={{ fontFamily: "Plus Jakarta Sans" }}
        >
          <div className="flex gap-3 justify-center items-center">
          {loading && <Spin className="text-white" indicator={<LoadingOutlined color="#ffffff" style={{ fontSize: 16, color: "white" }} spin />} />}
          <span className="mt-1 mb-1 font-semibold text-[14px] leading-[17.64px]">
            {title}
          </span>
          </div>
        </motion.button>
      </div>
    </>
  );
};

export default SimpleButton;
