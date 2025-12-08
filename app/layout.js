import { Montserrat, Pacifico} from 'next/font/google';
import './globals.css';

const montserrat = Montserrat({
  subsets: ['latin'],
  weights: ['300', '500', '900'], 
});

export const metadata = {
  title: 'TipNGoal',
  description: 'Sport News | Livescores | Booking Codes',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${montserrat.className}`}>{children}</body>
    </html>
  );
}
