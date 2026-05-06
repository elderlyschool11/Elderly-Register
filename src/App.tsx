import RegistrationForm from './components/RegistrationForm';
import { Heart, ShieldCheck, MapPin } from 'lucide-react';
import { motion } from 'motion/react';

function App() {
  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 md:p-6 font-sans">
      <main className="w-full max-w-5xl">
        <RegistrationForm />
        
        {/* Footer */}
        <footer className="mt-8 text-center text-slate-400 text-xs tracking-wider uppercase font-semibold">
          <p>© 2026 Elderly Link — พัฒนาเพื่อความสะดวกของผู้สูงอายุผ่าน LINE LIFF</p>
        </footer>
      </main>
    </div>
  );
}

export default App;
