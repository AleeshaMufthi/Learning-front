export default function PartnerLogos() {
    const partners = [
      { name: 'Illinois', logo: 'https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/https://coursera_assets.s3.amazonaws.com/images/94d374b55f8a5d9bfbaaf42a578f7ac5.png?auto=format%2Ccompress&dpr=1' },
      { name: 'Duke University', logo: 'https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/https://coursera_assets.s3.amazonaws.com/images/2fe47744cde1a0e41e409bf488e98027.png?auto=format%2Ccompress&dpr=1' },
      { name: 'Google', logo: 'https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/https://coursera_assets.s3.amazonaws.com/images/f93d412349e801238d46a2b167695c43.png?auto=format%2Ccompress&dpr=1' },
      { name: 'University of Michigan', logo: 'https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/https://coursera_assets.s3.amazonaws.com/images/e6636c6b8d2d141cbee6bf14f4b3d185.png?auto=format%2Ccompress&dpr=1' },
      { name: 'IBM', logo: 'https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/https://coursera_assets.s3.amazonaws.com/images/3c51760da56b41955094211c3a4cd179.png?auto=format%2Ccompress&dpr=1' },
      { name: 'Vanderbilt University', logo: 'https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/https://coursera_assets.s3.amazonaws.com/images/c5ee723406a053a78a85bc35f5b50681.png?auto=format%2Ccompress&dpr=1' },
      { name: 'Johns Hopkins University', logo: 'https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/https://coursera_assets.s3.amazonaws.com/images/87602a05d6b80695359dc331f2a745a6.png?auto=format%2Ccompress&dpr=1' },
    ]
  
    return (
      <section className="py-12 px-4 bg-white">
        <div className="max-w-full mx-auto px-4">
          <h2 className="text-2xl text-gray-800 font-medium text-center mb-7">
            Learn from 350+ top universities and companies
          </h2>
          <div className="flex flex-wrap justify-center items-center gap-6 md:gap-8 lg:gap-12">
            {partners.map((partner) => (
              <div
                key={partner.name}
                className="w-[150px] h-[60px] relative transition-transform hover:scale-105"
              >
                <img
                  src={partner.logo}
                  alt={`${partner.name} logo`}
                  fill
                  className="object-contain"
                />
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  }
  
  