import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { Zap, Shield, Map, Clock, ArrowRight, IndianRupee } from 'lucide-react';

const RouteComparison = ({ routes, onSelect }) => {
  const getIcon = (type) => {
    switch (type) {
      case 'Fastest': return <Zap className="w-5 h-5 text-yellow-500" />;
      case 'Safest': return <Shield className="w-5 h-5 text-green-500" />;
      case 'Shortest': return <Map className="w-5 h-5 text-blue-500" />;
      default: return <Map className="w-5 h-5" />;
    }
  };

  return (
    <div className="space-y-4">
      {routes.map((route, index) => (
        <motion.div
          key={route.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <Card className={`overflow-hidden transition-all hover:shadow-lg border-2 ${index === 0 ? 'border-primary shadow-md' : 'border-transparent'}`}>
            <CardContent className="p-0">
              <div className="flex flex-col md:flex-row">
                <div className={`p-6 md:w-1/3 flex flex-col justify-center ${index === 0 ? 'bg-primary/5' : 'bg-gray-50'}`}>
                  <div className="flex items-center gap-2 mb-2">
                    {getIcon(route.type)}
                    <h3 className="text-xl font-bold text-gray-900">{route.type}</h3>
                    {index === 0 && <Badge className="ml-auto bg-primary">Recommended</Badge>}
                  </div>
                  <p className="text-2xl font-black text-gray-900 mb-1">{route.travelTime}</p>
                  <p className="text-sm text-gray-500">{route.distance} • {route.routeName}</p>
                </div>
                
                <div className="p-6 md:w-2/3 flex flex-col justify-between bg-white">
                  <p className="text-gray-600 text-sm mb-4">{route.description}</p>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Traffic Impact</p>
                      <p className="text-sm font-semibold text-gray-900">{route.impact}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Complexity</p>
                      <p className="text-sm font-semibold text-gray-900">{route.complexity}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Conditions</p>
                      <Badge variant="outline" className="capitalize">{route.trafficStatus}</Badge>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Toll</p>
                      <p className="text-sm font-semibold text-gray-900 flex items-center gap-1">
                        {route.toll || 'Free'}
                      </p>
                    </div>
                  </div>
                  
                  <Button 
                    variant={index === 0 ? 'default' : 'outline'} 
                    className="w-full justify-between group"
                    onClick={() => onSelect && onSelect(route)}
                  >
                    Select Route
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  );
};

export default RouteComparison;