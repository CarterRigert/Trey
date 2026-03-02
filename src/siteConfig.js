const raw = {
  siteName: "CarterRigert",
  tagline: "Trey Test",
  aboutText: "Treys test website",
  primaryColor: "#b51a00",
  service1: { title: "Pain management ", description: "Management of pain" },
  service2: { title: "Sample service", description: "Sample" },
  service3: { title: "", description: "" },
  contact: {
    email: "test@gmail.com",
    phone: "5555555555",
    address: "123 hood river"
  },
  social: {
    instagram: "https://google.com",
    facebook: "https://google.com/"
  }
};

const isPlaceholder = (v) => !v || v.startsWith('{{');

const siteConfig = {
  ...raw,
  primaryColor: isPlaceholder(raw.primaryColor) ? '#555555' : raw.primaryColor,
};

export default siteConfig;
