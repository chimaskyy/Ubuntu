export function Hero() {
  return (
    <div
      className="relative h-[600px] bg-cover bg-center"
      style={{
        backgroundImage:
          'url("https://scontent.flos5-1.fna.fbcdn.net/v/t39.30808-6/440576329_18105212770391732_4763676200789185924_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=127cfc&_nc_eui2=AeEfNZl4aRTIYIlO9Eo_Tr1Wqm5DmEN2CcSqbkOYQ3YJxNdo4CHeK8DfGyo9_A7EkBtgft0f-AoA0bPDESwWGtQr&_nc_ohc=s23fftiBMkYQ7kNvgFOsvc7&_nc_zt=23&_nc_ht=scontent.flos5-1.fna&_nc_gid=AxRML0OnTJ6V1PXdqtD1Bpd&oh=00_AYB5QRRsOumHHGlHFgobeisxBnTf6_ysh376FQBwo4Fxmg&oe=674155E3")',
      }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-50" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
        <div className="text-white">
          <h1 className="text-5xl font-bold mb-4">African Fashion Redefined</h1>
          <p className="text-xl mb-8">
            Discover our collection of authentic African designs
          </p>
          <button className="bg-[#4169E1] text-white px-8 py-3 rounded-full font-medium hover:scale-105">
            Shop Now
          </button>
        </div>
      </div>
    </div>
  );
}
