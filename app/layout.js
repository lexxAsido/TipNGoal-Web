import { Montserrat, Pacifico} from 'next/font/google';
import './globals.css';

const montserrat = Montserrat({
  subsets: ['latin'],
  weights: ['300', '500', '900'], 
});

export const metadata = {
  title: 'TipNGoal',
  description: 'Betting Codes | Livescores |Sport News',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${montserrat.className}`}>{children}</body>
    </html>
  );
}
