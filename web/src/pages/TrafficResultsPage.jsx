import React from 'react';
import { Helmet } from 'react-helmet';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import MapViewSelector from '@/components/MapViewSelector.jsx';
import TrafficSignalDisplay from '@/components/TrafficSignalDisplay.jsx';
import EmergencyVehicleAlert from '@/components/EmergencyVehicleAlert.jsx';
import RouteComparison from '@/components/RouteComparison.jsx';
import AccidentTracker from '@/components/AccidentTracker.jsx';
import TrafficDensityHeatmap from '@/components/TrafficDensityHeatmap.jsx';
import { useRouteOptimization } from '@/hooks/useRouteOptimization.js';
import { ArrowLeft, Navigation, Clock, RefreshCw } from 'lucide-react';

const TrafficResultsPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { from, to } = location.state || { from: 'Delhi, NCT', to: 'Mumbai, Maharashtra' };
  
  const { routes, loading } = useRouteOptimization(from, to);

  return (
    <>
      <Helmet>
        <title>{`Traffic Results: ${from} to ${to} - TrafficFlow`}</title>
        <meta
          name="description"
          content={`Real-time traffic conditions and route options from ${from} to ${to}. Find the fastest route with live updates.`}
        />
      </Helmet>

      <div className="min-h-screen bg-gray-50 pb-12">
        {/* Hero Header */}
        <div
          className="relative h-64 bg-cover bg-center"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1639060015191-9d83063eab2a)'
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/50 to-gray-50" />
          <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col justify-center pt-8">
            <div className="flex justify-between items-start w-full mb-6">
              <Button
                variant="ghost"
                onClick={() => navigate('/')}
                className="text-white hover:bg-white/20 w-fit"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Search
              </Button>
              <MapViewSelector />
            </div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-4xl font-bold text-white mb-4">Route Optimization</h1>
              <div className="flex items-center gap-4 text-white/90">
                <div className="flex items-center gap-2 bg-black/30 px-3 py-1.5 rounded-full backdrop-blur-sm">
                  <Navigation className="w-4 h-4" />
                  <span className="text-sm font-medium">{from}</span>
                </div>
                <span className="text-xl">→</span>
                <div className="flex items-center gap-2 bg-black/30 px-3 py-1.5 rounded-full backdrop-blur-sm">
                  <Navigation className="w-4 h-4" />
                  <span className="text-sm font-medium">{to}</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-20">
          <div className="flex justify-between items-center mb-6 bg-white p-4 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center gap-2 text-sm text-gray-600 font-medium">
              <Clock className="w-4 h-4 text-primary" />
              Live AI Optimization Active
            </div>
            <Button 
              variant="outline" 
              size="sm" 
              disabled={loading}
              className="gap-2"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
              Refresh Data
            </Button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Main Content Column */}
            <div className="lg:col-span-8 space-y-8">
              
              {/* Emergency Alerts Section */}
              <section>
                <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  Active Alerts
                </h2>
                <EmergencyVehicleAlert />
              </section>

              {/* Route Comparison Section */}
              <section>
                <h2 className="text-xl font-bold text-gray-900 mb-4">Optimized Routes</h2>
                {loading ? (
                  <div className="space-y-4">
                    <Skeleton className="h-48 w-full rounded-xl" />
                    <Skeleton className="h-48 w-full rounded-xl" />
                  </div>
                ) : (
                  <RouteComparison routes={routes} />
                )}
              </section>
            </div>

            {/* Sidebar Column */}
            <div className="lg:col-span-4 space-y-6">
              {/* Traffic Signal Dashboard */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                <TrafficSignalDisplay />
              </motion.div>

              {/* Traffic Density Heatmap */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <TrafficDensityHeatmap />
              </motion.div>

              {/* Accident Tracker */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <AccidentTracker />
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TrafficResultsPage;