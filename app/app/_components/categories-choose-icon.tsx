import Image from "next/image";
import React, { useState } from "react";
import food from "@/public/icons/food.svg";
import bus from "@/public/icons/bus.svg";
import house from "@/public/icons/house.svg";
import hospital from "@/public/icons/hospital.svg";
import beach from "@/public/icons/beach.svg";
import alarm_clock from "@/public/icons/alarm_clock.svg";
import ball from "@/public/icons/ball.svg";
import book from "@/public/icons/book.svg";
import gift from "@/public/icons/gift.svg";
import graph from "@/public/icons/graph.svg";
import medal from "@/public/icons/medal.svg";
import money from "@/public/icons/money.svg";
import money_bag from "@/public/icons/money_bag.svg";
import shop from "@/public/icons/shop.svg";
import fak from "@/public/icons/fak.svg";
import lounge_chair from "@/public/icons/lounge_chair.svg";
import { Card } from "@/components/ui/card";

const icons = [
  food,
  bus,
  house,
  hospital,
  beach,
  alarm_clock,
  lounge_chair,
  fak,
  ball,
  book,
  gift,
  graph,
  medal,
  money,
  money_bag,
  shop,
];

const CategoriesChooseIcon = ({ setValue }: any) => {
  const [openChooseIcon, setOpenChooseIcon] = useState(false);
  const [iconSelected, setIconSelected] = useState(food.src);

  const selectIcon = (icon: string) => {
    setValue("icon", icon);
    setIconSelected(icon);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setOpenChooseIcon(!openChooseIcon)}
        type="button"
        className={`${openChooseIcon ? "bg-gray-200" : ""} flex border border-gray-800 rounded-lg items-center justify-center w-[38px] h-[38px]`}
      >
        <Image src={iconSelected} width={24} height={24} alt="food" />
      </button>

      {openChooseIcon && (
        <Card className="p-2 flex flex-wrap gap-2 w-[196px] justify-center absolute right-0 bottom-[130%]">
          {icons.map((icon, index) => (
            <button
              key={index}
              onClick={() => selectIcon(icon.src)}
              type="button"
              className="flex hover:bg-accent rounded-lg items-center justify-center w-[38px] h-[38px]"
            >
              <Image src={icon} width={24} height={24} alt="food" />
            </button>
          ))}
        </Card>
      )}
    </div>
  );
};

export default CategoriesChooseIcon;
