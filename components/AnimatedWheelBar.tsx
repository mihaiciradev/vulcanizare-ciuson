import Image from "next/image";

export default function AnimatedWheelBar() {
  return (
    <div className="hidden lg:block absolute right-8 top-0 bottom-0 w-20 pointer-events-none z-20">
      <div className="absolute left-1/2 top-[0%] bottom-[0%] w-px bg-dark/30 z-10" />

      <div className="absolute top-1/3 sticky z-20 translate-x-1/4 ">
        <Image
          src="/images/servicii_movingwheel.svg"
          alt=""
          width={40}
          height={40}
          className="drop-shadow-2xl"
        />
      </div>
    </div>
  );
}
