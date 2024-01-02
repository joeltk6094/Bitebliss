import React from 'react';
import food1 from './public/food1.jpg';
import food2 from './public/food2.jpg';
import food3 from './public/food3.jpg';
import food4 from './public/food4.jpg';
import deliveryIcon from './public/food5.jpg';
import BubbleEffect from './BubbleEffect';
import Spline from './Spline';
import Header from './Header';

const AboutusText = () => {
  return (
    <>
    <div className="p-12">
      <Header/>
      </div>
    <div>
    <Spline/>
      <BubbleEffect />
      <div className="w-full bg-white p-8">
  <div className="leading-relaxed text-lg">
    <p className="text-black">
      Welcome to our awesome food delivery app, serving delicious meals since 2023! At City, we are passionate about bringing tasty and satisfying food right to your doorstep. Our mission is to make your dining experience convenient, enjoyable, and full of flavor.
    </p>
    <p className="text-gray-600 mt-4">
      🍔🍕🌮 From quick bites to gourmet delights, we've got something for everyone. Join us on this culinary journey and discover the joy of hassle-free and delightful dining.
    </p>
  </div>
</div>




    </div>
      <section className="text-gray-900 body-font pt-8">
        <h1 className="text-4xl text-center">Our Story</h1>
        <div className="container px-5 py-4 mx-auto">
          <div className="w-full mx-auto text-center">
            <p className="leading-relaxed text-lg">
              Providing our customers with a sophisticated ecommerce retail
              shopping experience. Our products coupled with a relaxed and
              gourmet atmosphere appeals to a wide variety of customers. With
              top-rated selections in fine quality clothing products, cosmetic
              products, and other accessories, Async Store is committed to
              providing the best merchandise selection at the lowest possible
              prices.
            </p>
            <span className="inline-block h-1 w-10 rounded bg-black-500 mt-8 mb-6"></span>
          </div>
        </div>
      </section>

      <section className="text-gray-600 body-font">
        <div className="container px-5 py-4 mx-auto">
          <div className="flex flex-wrap -m-4 text-center">
            <div className="p-4 sm:w-1/4 w-1/2">
              <h2 className="title-font font-medium sm:text-4xl text-3xl text-gray-900">
                2.7K
              </h2>
              <p className="leading-relaxed">Visitors</p>
            </div>
            <div className="p-4 sm:w-1/4 w-1/2">
              <h2 className="title-font font-medium sm:text-4xl text-3xl text-gray-900">
                1.8K
              </h2>
              <p className="leading-relaxed">Subscribes</p>
            </div>
            <div className="p-4 sm:w-1/4 w-1/2">
              <h2 className="title-font font-medium sm:text-4xl text-3xl text-gray-900">
                150
              </h2>
              <p className="leading-relaxed">Orders</p>
            </div>
            <div className="p-4 sm:w-1/4 w-1/2">
              <h2 className="title-font font-medium sm:text-4xl text-3xl text-gray-900">
                500
              </h2>
              <p className="leading-relaxed">Products</p>
            </div>
          </div>
        </div>
      </section>

      <section className="text-gray-600 body-font flex justify-center align-middle">
        <div className="container px-5 py-24 mx-auto">
          <div className="flex flex-wrap justify-center">
            <div className="xl:w-1/4 lg:w-1/2 md:w-full px-8 py-6 border-l-2 border-gray-200 border-opacity-60">
              <div className="w-full">
                <img src={food1} alt="food" />
              </div>
              <h2 className="text-lg sm:text-xl text-gray-900 font-medium title-font mb-2">
                Made to Create Good
              </h2>
              <p className="leading-relaxed text-base mb-4">
                We design outdoor products to help you create good moments that
                become lasting memories.
              </p>
            </div>
            <div className="xl:w-1/4 lg:w-1/2 md:w-full px-8 py-6 border-l-2 border-gray-200 border-opacity-60">
              <div className="w-full ">
                <img src={food2} alt="pizza" />
              </div>
              <h2 className="text-lg sm:text-xl text-gray-900 font-medium title-font mb-2">
                Free Shipping & Returns
              </h2>
              <p className="leading-relaxed text-base mb-4">
                Free shipping and returns on all orders in India.
              </p>
            </div>
            <div className="xl:w-1/4 lg:w-1/2 md:w-full px-8 py-6 border-l-2 border-gray-200 border-opacity-60">
              <div className="w-full ">
                <img src={food3} alt="pasta" />
              </div>
              <h2 className="text-lg sm:text-xl text-gray-900 font-medium title-font mb-2">
                200+ 5 Star Reviews
              </h2>
              <p className="leading-relaxed text-base mb-4">
                Ingenious, quality products designed to last for a long time.
              </p>
            </div>
            <div className="xl:w-1/4 lg:w-1/2 md:w-full px-8 py-6 border-l-2 border-gray-200 border-opacity-60">
              <div className="w-full ">
                <img src={food4} alt="burger" />
              </div>
              <h2 className="text-lg sm:text-xl text-gray-900 font-medium title-font mb-2">
                We Deliver Happiness
              </h2>
              <p className="leading-relaxed text-base mb-4">
              We're passionate about food, crafting memorable experiences, one delivery at a time. Join us in the delicious expedition of flavors and convenience.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="text-gray-600 body-font">
        <h1 className="text-4xl font-medium title-font text-gray-900 mb-2 text-center">
          Testimonials
        </h1>
        <div className="container px-5 py-14 mx-auto ">
          <div className="flex flex-wrap -m-4">
            <div className="p-4 md:w-1/2 w-full">
              <div className="h-full bg-gray-200 p-8 rounded">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  className="block w-5 h-5 text-gray-400 mb-4"
                  viewBox="0 0 975.036 975.036"
                >
                  <path d="M925.036 57.197h-304c-27.6 0-50 22.4-50 50v304c0 27.601 22.4 50 50 50h145.5c-1.9 79.601-20.4 143.3-55.4 191.2-27.6 37.8-69.399 69.1-125.3 93.8-25.7 11.3-36.8 41.7-24.8 67.101l36 76c11.6 24.399 40.3 35.1 65.1 24.399 66.2-28.6 122.101-64.8 167.7-108.8 55.601-53.7 93.7-114.3 114.3-181.9 20.601-67.6 30.9-159.8 30.9-276.8v-239c0-27.599-22.401-50-50-50zM106.036 913.497c65.4-28.5 121-64.699 166.9-108.6 56.1-53.7 94.4-114.1 115-181.2 20.6-67.1 30.899-159.6 30.899-277.5v-239c0-27.6-22.399-50-50-50h-304c-27.6 0-50 22.4-50 50v304c0 27.601 22.4 50 50 50h145.5c-1.9 79.601-20.4 143.3-55.4 191.2-27.6 37.8-69.4 69.1-125.3 93.8-25.7 11.3-36.8 41.7-24.8 67.101l35.9 75.8c11.601 24.399 40.501 35.2 65.301 24.399z"></path>
                </svg>
                <p className="leading-relaxed mb-6">
                Unveiling the culinary journey – From kitchen to your doorstep. Savor convenience with every delightful bite.
                </p>
                <span className="inline-flex items-center">
                  <img
                    alt="testimonial"
                    src="https://img.freepik.com/free-photo/happy-bearded-man-business-clothes-looking-camera_171337-11392.jpg?size=626&ext=jpg&ga=GA1.1.1413502914.1696377600&semt=ais"
                    className="w-12 h-12 rounded-full flex-shrink-0 object-cover object-center"
                  />
                  <span className="flex-grow flex flex-col pl-4">
                    <span className="title-font font-medium text-gray-900">
                      Swetabh Singh
                    </span>
                    <span className="text-gray-500 text-sm">Customer</span>
                  </span>
                </span>
              </div>
            </div>
            <div className="p-4 md:w-1/2 w-full">
              <div className="h-full bg-gray-200 p-8 rounded">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  className="block w-5 h-5 text-gray-400 mb-4"
                  viewBox="0 0 975.036 975.036"
                >
                  <path d="M925.036 57.197h-304c-27.6 0-50 22.4-50 50v304c0 27.601 22.4 50 50 50h145.5c-1.9 79.601-20.4 143.3-55.4 191.2-27.6 37.8-69.399 69.1-125.3 93.8-25.7 11.3-36.8 41.7-24.8 67.101l36 76c11.6 24.399 40.3 35.1 65.1 24.399 66.2-28.6 122.101-64.8 167.7-108.8 55.601-53.7 93.7-114.3 114.3-181.9 20.601-67.6 30.9-159.8 30.9-276.8v-239c0-27.599-22.401-50-50-50zM106.036 913.497c65.4-28.5 121-64.699 166.9-108.6 56.1-53.7 94.4-114.1 115-181.2 20.6-67.1 30.899-159.6 30.899-277.5v-239c0-27.6-22.399-50-50-50h-304c-27.6 0-50 
-8-22.4-50 50v304c0 27.601 22.4 50 50 50h145.5c-1.9 79.601-20.4 143.3-55.4 191.2-27.6 37.8-69.399 69.1-125.3 93.8-25.7 11.3-36.8 41.7-24.8 67.101l35.9 75.8c11.601 24.399 40.501 35.2 65.301 24.399z"></path>
</svg>
<p className="leading-relaxed mb-6">
Embark on a flavor odyssey! Discover our story, passion, and the essence of food magic.
</p>
<span className="inline-flex items-center">
  <img
    alt="testimonial"
    src="https://t3.ftcdn.net/jpg/02/43/12/34/360_F_243123463_zTooub557xEWABDLk0jJklDyLSGl2jrr.jpg"
    className="w-12 h-12 rounded-full flex-shrink-0 object-cover object-center"
  />
  <span className="flex-grow flex flex-col pl-4">
    <span className="title-font font-medium text-gray-900">
      Mohit Singh
    </span>
    <span className="text-gray-500 text-sm">Customer</span>
  </span>
</span>
</div>
</div>
</div>
</div>
</section>

<footer className="bg-gray-800 text-white p-8">
      <div className="container mx-auto text-center">
        <p>&copy; 2023 Your Company. All rights reserved.</p>
      </div>
    </footer>
</>
);
};

export default AboutusText;
