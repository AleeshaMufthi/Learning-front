import React from 'react'
import { Link } from 'react-router-dom'
const LandingFooter = () => {
    const footerSections = {
        coursera: {
          title: 'Coursera',
          links: [
            { name: 'About', href: '#' },
            { name: 'What We Offer', href: '#' },
            { name: 'Leadership', href: '#' },
            { name: 'Careers', href: '#' },
            { name: 'Catalog', href: '#' },
            { name: 'Coursera Plus', href: '#' },
            { name: 'Professional Certificates', href: '#' },
            { name: 'MasterTrack® Certificates', href: '#' },
            { name: 'Degrees', href: '#' },
            { name: 'For Enterprise', href: '#' },
            { name: 'For Government', href: '#' },
            { name: 'For Campus', href: '#' },
            { name: 'Become a Partner', href: '#' },
          ],
        },
        community: {
          title: 'Community',
          links: [
            { name: 'Learners', href: '#' },
            { name: 'Partners', href: '#' },
            { name: 'Beta Testers', href: '#' },
            { name: 'Blog', href: '#' },
            { name: 'The Coursera Podcast', href: '#' },
            { name: 'Tech Blog', href: '#' },
            { name: 'Teaching Center', href: '#' },
          ],
        },
        more: {
          title: 'More',
          links: [
            { name: 'Press', href: '#' },
            { name: 'Investors', href: '#' },
            { name: 'Terms', href: '#' },
            { name: 'Privacy', href: '#' },
            { name: 'Help', href: '#' },
            { name: 'Accessibility', href: '#' },
            { name: 'Contact', href: '#' },
            { name: 'Articles', href: '#' },
            { name: 'Directory', href: '#' },
            { name: 'Affiliates', href: '#' },
            { name: 'Modern Slavery Statement', href: '#' },
          ],
        },
      }
  return (
    <footer className="border-t">
    <div className="container mx-auto px-6 py-11">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {/* Footer Sections */}
        {Object.entries(footerSections).map(([key, section]) => (
          <div key={key}>
            <h2 className="font-semibold text-lg mb-4">{section.title}</h2>
            <ul className="space-y-3">
              {section.links.map((link) => (
                <li key={link.name}>
                  <Link 
                    href={link.href}
                    className="text-gray-500 hover:text-gray-900 text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}

        {/* Download Apps Section */}
        <div className="space-y-4">
          <Link href="#" className="block w-[50px]">
            <img
              src="https://w7.pngwing.com/pngs/566/36/png-transparent-app-store-iphone-apple-app-store-icon-blue-text-mobile-phones-thumbnail.png"
              alt="Download on the App Store"
              width={140}
              height={48}
              className="rounded-lg"
            />
          </Link>
          <Link href="#" className="block w-[50px]">
            <img
              src="https://static-00.iconduck.com/assets.00/google-play-icon-1024x1024-ntijeqxd.png"
              alt="Get it on Google Play"
              width={140}
              height={48}
              className="rounded-lg"
            />
          </Link>
          <Link href="#" className="block w-[50px] mt-8">
            <img
              src="https://w7.pngwing.com/pngs/233/462/png-transparent-b-corporation-benefit-corporation-business-b-lab-non-profit-organisation-business-text-people-logo.png"
              alt="B Corporation Certification"
              className="rounded-lg"
            />
          </Link>
        </div>
      </div>
    </div>
  </footer>
  )
}

export default LandingFooter
