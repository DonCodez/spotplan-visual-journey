
import { Card } from "@/components/ui/card";
import { Play } from "lucide-react";
import { useState } from "react";
import VideoPlayer from "@/components/ui/video-player";
import { motion, AnimatePresence } from "framer-motion";

const DemoPreviewSection = () => {
  const [showVideo, setShowVideo] = useState(false);

  return (
    <section className="pt-8 pb-20 bg-gray-50" id="demo-preview">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-3">
            See SpotPlan in Action
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Watch how easy it is to plan your perfect trip with our intelligent platform
          </p>
        </div>

        <Card className="relative overflow-hidden shadow-2xl border-0 group">
          <div className="aspect-video bg-gradient-to-br from-spot-sky to-spot-blue relative">
            {/* Placeholder for demo video/screenshots */}
            <div className="absolute inset-0 flex items-center justify-center bg-black/20">
              <div className="text-center">
                <div 
                  className="w-20 h-20 bg-white/90 rounded-full flex items-center justify-center mb-4 mx-auto group-hover:scale-110 transition-transform duration-300 cursor-pointer"
                  onClick={() => setShowVideo(true)}
                >
                  <Play className="w-8 h-8 text-spot-primary ml-1" />
                </div>
                <p className="text-white text-lg font-semibold">Watch Demo</p>
              </div>
            </div>
            
            {/* Floating UI elements for visual interest */}
            <div className="absolute top-4 left-4 bg-white/90 rounded-lg p-3 shadow-lg animate-float">
              <div className="text-sm font-semibold text-spot-primary">✈️ Paris, France</div>
              <div className="text-xs text-gray-600">5 days • $1,200</div>
            </div>
            
            <div className="absolute bottom-4 right-4 bg-white/90 rounded-lg p-3 shadow-lg animate-float" style={{ animationDelay: '1s' }}>
              <div className="text-sm font-semibold text-spot-primary">🍽️ Restaurant booked</div>
              <div className="text-xs text-gray-600">Tonight at 7 PM</div>
            </div>
          </div>
        </Card>

        {/* Video Player Modal */}
        <AnimatePresence>
          {showVideo && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
              onClick={() => setShowVideo(false)}
            >
              <motion.div
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.5, opacity: 0 }}
                transition={{ type: "spring", damping: 25, stiffness: 300 }}
                className="w-full max-w-6xl"
                onClick={(e) => e.stopPropagation()}
              >
                <VideoPlayer src="https://videos.pexels.com/video-files/30333849/13003128_2560_1440_25fps.mp4" />
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setShowVideo(false)}
                  className="mt-4 mx-auto block text-white hover:text-gray-300 transition-colors"
                >
                  Click anywhere outside to close
                </motion.button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default DemoPreviewSection;
