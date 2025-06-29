import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, User, Phone, Calendar, Users, Loader2 } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { getInitialCharacter } from '../data/initialData';
import { useAppContext } from '../context/AppContext';

const Auth: React.FC = () => {
  const navigate = useNavigate();
  const { loading: appLoading } = useAppContext();
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Profile information
  const [hunterName, setHunterName] = useState('');
  const [age, setAge] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [gender, setGender] = useState<'male' | 'female' | 'other'>('male');

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      if (isLogin) {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (error) throw error;
        navigate('/');
      } else {
        const { data: { user }, error } = await supabase.auth.signUp({
          email,
          password,
        });
        if (error) throw error;
        
        if (user) {
          // Create initial character with gender-appropriate avatar
          const initialCharacterData = getInitialCharacter(hunterName, gender);
          initialCharacterData.id = user.id;

          const { error: profileError } = await supabase
            .from('profiles')
            .insert([
              {
                user_id: user.id,
                hunter_name: hunterName,
                age: parseInt(age),
                phone_number: phoneNumber,
                gender,
                character: initialCharacterData
              }
            ]);

          if (profileError) throw profileError;
          navigate('/');
        }
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  // Show loading screen while app is initializing
  if (appLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <motion.div
          className="flex flex-col items-center gap-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          >
            <Loader2 size={48} className="text-primary-400" />
          </motion.div>
          <p className="text-gray-400">Initializing...</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <div className="card p-8">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-heading font-bold mb-2">
              {isLogin ? 'Welcome Back, Hunter' : 'Begin Your Journey'}
            </h2>
            <p className="text-gray-400 text-sm">
              {isLogin ? 'Sign in to continue your adventure' : 'Create your hunter profile'}
            </p>
          </div>

          {error && (
            <div className="bg-red-500/10 border border-red-500/20 text-red-500 p-3 rounded-lg mb-4 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleAuth} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-dark-200 border border-gray-700 rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:border-primary-500"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-dark-200 border border-gray-700 rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:border-primary-500"
                  required
                  minLength={6}
                />
              </div>
            </div>

            {!isLogin && (
              <>
                <div>
                  <label className="block text-sm font-medium mb-1">Hunter Name</label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    <input
                      type="text"
                      value={hunterName}
                      onChange={(e) => setHunterName(e.target.value)}
                      className="w-full bg-dark-200 border border-gray-700 rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:border-primary-500"
                      required
                      placeholder="Enter your hunter name"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Age</label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    <input
                      type="number"
                      value={age}
                      onChange={(e) => setAge(e.target.value)}
                      className="w-full bg-dark-200 border border-gray-700 rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:border-primary-500"
                      required
                      min="13"
                      max="120"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Phone Number</label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    <input
                      type="tel"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      className="w-full bg-dark-200 border border-gray-700 rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:border-primary-500"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Gender</label>
                  <div className="relative">
                    <Users className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    <select
                      value={gender}
                      onChange={(e) => setGender(e.target.value as 'male' | 'female' | 'other')}
                      className="w-full bg-dark-200 border border-gray-700 rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:border-primary-500"
                      required
                    >
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>

                {/* Avatar preview */}
                <div className="flex items-center gap-3 p-3 bg-dark-200/50 rounded-lg">
                  <img
                    src={
                      gender === 'female' 
                        ? 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
                        : gender === 'male'
                        ? 'https://images.pexels.com/photos/1722198/pexels-photo-1722198.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
                        : 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
                    }
                    alt="Character preview"
                    className="w-12 h-12 rounded-full object-cover border-2 border-primary-500"
                  />
                  <div>
                    <p className="text-sm font-medium">Character Preview</p>
                    <p className="text-xs text-gray-400">This will be your hunter avatar</p>
                  </div>
                </div>
              </>
            )}

            <button
              type="submit"
              className="w-full btn btn-primary flex items-center justify-center gap-2"
              disabled={loading}
            >
              {loading && <Loader2 size={18} className="animate-spin" />}
              {loading ? 'Processing...' : (isLogin ? 'Sign In' : 'Create Account')}
            </button>

            <p className="text-center text-sm text-gray-400">
              {isLogin ? "Don't have an account? " : "Already have an account? "}
              <button
                type="button"
                onClick={() => setIsLogin(!isLogin)}
                className="text-primary-400 hover:text-primary-300 transition-colors"
              >
                {isLogin ? 'Sign Up' : 'Sign In'}
              </button>
            </p>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default Auth;