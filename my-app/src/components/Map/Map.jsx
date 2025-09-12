"use client";

const Map = () => {
  return (
    <div className="w-full h-[300px] md:h-auto">
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3770.797146954139!2d72.87783317395099!3d19.072654452080013!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c9598ad468b5%3A0xa355e25756e9a44f!2sCode4Bharat!5e0!3m2!1sen!2sin!4v1757401395989!5m2!1sen!2sin"
        className="w-full h-full rounded-2xl border-0"
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
    </div>
  );
};

export default Map;
