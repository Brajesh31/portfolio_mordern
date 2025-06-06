// Import images (adjust path/filenames as needed)
import canvaImg from '/src/assets/canva.jpg';
import canvaWebImg from '/src/assets/canva-webpages.jpg';
import uxPortfolioImg from '/src/assets/ux-portfolio.jpg';
import pitchDeckImg from '/src/assets/pitch-deck.jpg';
import websiteVideosImg from '/src/assets/website-videos.jpg';

export const certificates = [
  {
    id: "3",
    title: "Build Customizable Sales Presentation Graphics Using Canva",
    issuer: "Coursera",
    date: "March 2025",
    credentialId: "U16VPKBLWHKJ",
    image: canvaImg,
    featured: true
  },
  {
    id: "4",
    title: "Use Canva to Create Desktop and Mobile-friendly Web Pages",
    issuer: "Coursera",
    date: "March 2025",
    credentialId: "8ULAP5KM83Y0",
    image: canvaWebImg,
    featured: true
  },
  {
    id: "5",
    title: "Create Your UX Portfolio with Crevado",
    issuer: "Coursera",
    date: "March 2025",
    credentialId: "H32NN875QYLJ",
    image: uxPortfolioImg,
    featured: true
  },
  {
    id: "6",
    title: "Design a Pitch Deck with Canva",
    issuer: "Coursera",
    date: "March 2025",
    credentialId: "G1K53UY9ZGKW",
    image: pitchDeckImg,
    featured: true
  },
  {
    id: "6",
    title: "Create Website Videos with Canva",
    issuer: "EDX Alumni",
    date: "March 2025",
    credentialId: "QS8RY49ISMIR",
    image: websiteVideosImg,
    featured: true
  }
];

export const certificateCategories = [
  {
    name: "UI/UX & Software Development",
    certificates: [
      "Build Customizable Sales Presentation Graphics Using Canva",
      "Use Canva to Create Desktop and Mobile-friendly Web Pages",
      "Create Your UX Portfolio with Crevado",
      "Design a Pitch Deck with Canva",
      "Create Website Videos with Canva"
    ]
  }
];
