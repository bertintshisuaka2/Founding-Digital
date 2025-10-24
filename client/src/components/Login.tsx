import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Lock, LogOut, AlertCircle } from "lucide-react";
import { toast } from "sonner";

interface LoginProps {
  onLogin: () => void;
  isAuthenticated: boolean;
  onLogout: () => void;
}

export default function Login({ onLogin, isAuthenticated, onLogout }: LoginProps) {
  const [pin, setPin] = useState("");
  const [error, setError] = useState(false);
  const CORRECT_PIN = "3495"; // You can change this to any 4-digit PIN

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (pin === CORRECT_PIN) {
      setError(false);
      onLogin();
      toast.success("Login successful!");
      setPin("");
    } else {
      setError(true);
      setPin("");
    }
  };

  const handlePinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "").slice(0, 4);
    setPin(value);
    setError(false);
  };

  if (isAuthenticated) {
    return (
      <div className="fixed top-4 right-4 z-50">
        <Button
          onClick={onLogout}
          variant="outline"
          className="bg-red-900 hover:bg-red-800 text-white border-red-700"
        >
          <LogOut className="w-4 h-4 mr-2" />
          Logout
        </Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-950 to-black flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-gray-900 border-yellow-700">
        <CardHeader className="text-center">
          <div className="mb-6 flex items-center justify-center gap-8">
            {/* University of Phoenix Logo */}
            <img 
              src="/uophoenix-logo.png" 
              alt="University of Phoenix" 
              className="w-20 h-20 object-contain"
            />
            
            {/* Profile Photo */}
            <img 
              src="/bertin-login.png" 
              alt="Bertin Tshisuaka" 
              className="w-32 h-32 rounded-full object-cover border-4 border-yellow-500 shadow-lg"
            />
            
            {/* Georgia Tech Logo */}
            <img 
              src="/gatech-logo.png" 
              alt="Georgia Tech" 
              className="w-20 h-20 object-contain"
            />
          </div>
          <CardTitle className="text-2xl text-white">
            Africa Funding Finder
          </CardTitle>
          <p className="text-gray-400 text-sm mt-2">
            Enter your 4-digit PIN to access the platform
          </p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Input
                type="password"
                inputMode="numeric"
                maxLength={4}
                value={pin}
                onChange={handlePinChange}
                placeholder="Enter 4-digit PIN"
                className={`text-center text-2xl tracking-widest bg-gray-800 border-gray-700 text-white ${
                  error ? "border-red-500" : ""
                }`}
                autoFocus
              />
            </div>

            {error && (
              <div className="bg-red-950 border border-red-700 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-red-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="text-red-300 font-semibold mb-1">Incorrect PIN</h4>
                    <p className="text-red-200 text-sm mb-2">
                      The PIN you entered is incorrect. Please try again or contact support for assistance.
                    </p>
                    <div className="bg-red-900 rounded p-3 mt-3">
                      <p className="text-white text-sm font-semibold mb-1">Need Help?</p>
                      <p className="text-red-100 text-sm">
                        Text <span className="font-bold">Bertin Tshisuaka</span> for assistance
                      </p>
                      <a 
                        href="sms:+16789796811" 
                        className="text-yellow-300 hover:text-yellow-200 font-bold text-lg block mt-1"
                      >
                        📱 +1 (678) 979-6811
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 text-white text-lg py-6"
              disabled={pin.length !== 4}
            >
              Login
            </Button>
          </form>

          <div className="mt-6 text-center">
            <div className="bg-gradient-to-r from-yellow-900 to-green-900 p-4 rounded-lg border border-yellow-700">
              <div className="text-xl font-bold text-yellow-300 mb-1">Diva Laser</div>
              <div className="text-sm text-white">Software Solutions</div>
              <div className="text-xs text-gray-300 mt-2">
                Bridging the Digital Gap in Africa
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

