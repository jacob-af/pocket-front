import type { Config } from "tailwindcss";
import { withUt } from "uploadthing/tw";

export default withUt({
  // Your existing Tailwind config
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      fontSize: {
        xxs: "10px" // Define smaller font size here
      }
    }
  },
  plugins: []
});

// const config: Config = {
//   content: [
//     "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
//     "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
//     "./src/app/**/*.{js,ts,jsx,tsx,mdx}"
//   ],
//   theme: {
//     extend: {
//       fontSize: {
//         xxs: "10px" // Define smaller font size here
//       }
//     }
//   },
//   plugins: []
// };
// export default config;
