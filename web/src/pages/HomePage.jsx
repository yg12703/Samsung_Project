import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import LocationInput from '@/components/LocationInput.jsx';
import TrafficStatusCard from '@/components/TrafficStatusCard.jsx';
import { Search, Clock, TrendingUp, Zap, History, Trash2, Bookmark } from 'lucide-react';
import { useRouteHistory } from '@/hooks/useRouteHistory.js';
import { useSavedRoutes } from '@/hooks/useSavedRoutes.js';

const HomePage = () => {
  const navigate = useNavigate();
  const [fromLocation, setFromLocation] = useState('');
  const [toLocation, setToLocation] = useState('');
  const { history, addRoute, clearHistory } = useRouteHistory();
  const { savedRoutes } = useSavedRoutes();

  const handleSearch = () => {
    if (fromLocation && toLocation) {
      addRoute(fromLocation, toLocation);
      navigate('/results', { state: { from: fromLocation, to: toLocation } });
    }
  };

  const handleHistoryClick = (from, to) => {
    setFromLocation(from);
    setToLocation(to);
    navigate('/results', { state: { from, to } });
  };

  const featuredRoutes = [
    {
      routeName: 'Mumbai to Pune',
      distance: '150 km',
      travelTime: '2h 45m',
      trafficStatus: 'moderate',
      description: 'Via Mumbai-Pune Expressway. Moderate traffic near Lonavala ghat section.'
    },
    {
      routeName: 'Delhi to Jaipur',
      distance: '280 km',
      travelTime: '5h 15m',
      trafficStatus: 'light',
      description: 'Via NH48. Clear conditions with minimal delays. Toll plazas operating smoothly.'
    },
    {
      routeName: 'Bangalore to Chennai',
      distance: '345 km',
      travelTime: '6h 30m',
      trafficStatus: 'heavy',
      description: 'Via NH48. Heavy congestion near Hosur and Sriperumbudur industrial areas.'
    }
  ];

  const features = [
    {
      icon: <Zap className="w-8 h-8 text-primary" />,
      title: 'Real-Time Updates',
      description: 'Get live traffic data updated every minute for accurate route planning across India.'
    },
    {
      icon: <TrendingUp className="w-8 h-8 text-primary" />,
      title: 'Smart Routing',
      description: 'AI-powered algorithms find the fastest routes based on current Indian road conditions.'
    },
    {
      icon: <Clock className="w-8 h-8 text-primary" />,
      title: 'Time Savings',
      description: 'Save an average of 30 minutes per trip with optimized route suggestions and toll info.'
    }
  ];

  return (
    <>
      <Helmet>
        <title>TrafficFlow - Real-Time Traffic Monitoring & Route Optimization</title>
        <meta
          name="description"
          content="Find the fastest routes with real-time traffic updates. TrafficFlow helps you navigate smarter and save time on every journey."
        />
      </Helmet>

      <div className="min-h-screen">
        <section className="relative h-screen flex items-center justify-center overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: 'url(https://images.unsplash.com/photo-1606839837070-4f35acdf8671)'
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black/70" />
          </div>

          <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 mt-16">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-12"
            >
              <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
                Navigate Smarter,
                <br />
                <span className="text-primary">Arrive Faster</span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-200 max-w-3xl mx-auto">
                Real-time traffic monitoring and intelligent route optimization for your daily commute
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <Card className="max-w-4xl mx-auto shadow-2xl border-0">
                <CardContent className="p-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <LocationInput
                      label="From"
                      value={fromLocation}
                      onChange={setFromLocation}
                      placeholder="Enter starting city (e.g., Delhi)"
                    />
                    <LocationInput
                      label="To"
                      value={toLocation}
                      onChange={setToLocation}
                      placeholder="Enter destination (e.g., Mumbai)"
                    />
                  </div>
                  <Button
                    onClick={handleSearch}
                    className="w-full h-14 text-lg font-semibold"
                    size="lg"
                    disabled={!fromLocation || !toLocation}
                  >
                    <Search className="w-5 h-5 mr-2" />
                    Search Routes
                  </Button>
                </CardContent>
              </Card>
            </motion.div>

            {history.length > 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="max-w-4xl mx-auto mt-8"
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-white text-lg font-semibold flex items-center gap-2">
                    <History className="w-5 h-5" /> Recent Searches
                  </h3>
                  <Button variant="ghost" size="sm" onClick={clearHistory} className="text-gray-300 hover:text-white hover:bg-white/10">
                    <Trash2 className="w-4 h-4 mr-2" /> Clear
                  </Button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {history.slice(0, 3).map((search) => (
                    <Card
                      key={search.id}
                      onClick={() => handleHistoryClick(search.from, search.to)}
                      className="bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/20 transition-all cursor-pointer"
                    >
                      <CardContent className="p-4">
                        <div className="flex items-start gap-2 mb-2">
                          <Clock className="w-4 h-4 text-primary mt-1 flex-shrink-0" />
                          <div className="flex-1 min-w-0">
                            <p className="text-white font-medium truncate">{search.from}</p>
                            <p className="text-white font-medium truncate">{search.to}</p>
                          </div>
                        </div>
                        <p className="text-gray-300 text-xs">
                          {new Date(search.timestamp).toLocaleDateString()}
                        </p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </motion.div>
            )}
          </div>
        </section>

        {savedRoutes.length > 0 && (
          <section className="py-16 bg-white border-b border-gray-100">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="mb-8 flex items-center gap-3"
              >
                <Bookmark className="w-8 h-8 text-primary" />
                <h2 className="text-3xl font-bold text-gray-900">Saved Routes ({savedRoutes.length})</h2>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {savedRoutes.map((route, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                  >
                    <TrafficStatusCard {...route} />
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
        )}

        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Choose TrafficFlow?</h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Powered by advanced algorithms and real-time data to optimize your journey
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Card className="h-full hover:shadow-xl transition-shadow">
                    <CardContent className="p-8 text-center">
                      <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4">
                        {feature.icon}
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                      <p className="text-gray-600">{feature.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Featured Routes</h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Popular Indian routes with current traffic conditions
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {featuredRoutes.map((route, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <TrafficStatusCard {...route} />
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default HomePage;