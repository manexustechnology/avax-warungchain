
import React from 'react';
import { ArrowRight, Store, Coins, Brain, Carrot, ShoppingCart, Zap, Shield, Globe } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/context/LanguageContext';

const Hero = () => {
  const { t } = useLanguage();
  
  return (
    <section className="min-h-screen flex items-center pt-24 pb-16 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-avax-primary/5 via-warung-warm/10 to-avax-secondary/5"></div>
      <div className="absolute top-20 right-10 w-32 h-32 bg-warung-pattern opacity-10 rounded-full blur-xl"></div>
      <div className="absolute bottom-20 left-10 w-24 h-24 bg-avax-accent opacity-20 rounded-full blur-lg"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8 animate-slide-up">
            {/* Avalanche + Warung Brand Badge */}
            <div className="flex items-center space-x-3">
              <div className="flex items-center bg-warung-wooden/20 backdrop-blur-md px-4 py-2 rounded-full border border-warung-accent/30">
                <div className="w-6 h-6 bg-avax-primary rounded-full mr-2 flex items-center justify-center">
                  <Zap className="w-3 h-3 text-white" />
                </div>
                <span className="text-sm font-medium text-warung-dark">{t('hero.tag')}</span>
              </div>
            </div>
            
            <div>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mt-4 leading-tight">
                <span className="text-avax-primary">{t('hero.title.part1')}</span>{' '}
                <span className="text-warung-accent">{t('hero.title.part2')}</span>{' '}
                <span className="bg-gradient-to-r from-avax-secondary to-avax-accent bg-clip-text text-transparent">
                  {t('hero.title.part3')}
                </span>
              </h1>
              <p className="text-xl text-warung-muted mt-6 leading-relaxed">
                {t('hero.description')}
              </p>
            </div>
            
            {/* Avalanche Network Badge */}
            <div className="flex items-center space-x-2 bg-avax-primary/10 backdrop-blur-sm px-4 py-3 rounded-xl border border-avax-primary/20">
              <div className="w-8 h-8 bg-gradient-to-r from-avax-primary to-avax-secondary rounded-lg flex items-center justify-center">
                <div className="w-4 h-4 bg-white rounded-sm"></div>
              </div>
              <div>
                <p className="text-sm font-semibold text-avax-primary">Powered by Avalanche Network</p>
                <p className="text-xs text-warung-muted">Fast, Secure, Eco-Friendly Blockchain</p>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/products" className="btn-avalanche flex items-center justify-center group">
                <span>{t('hero.exploreButton')}</span>
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link to="/about" className="btn-warung flex items-center justify-center">
                {t('hero.learnMoreButton')}
              </Link>
            </div>
            
            {/* Feature Grid - Fusion Style */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-4">
              <div className="flex items-center space-x-3 bg-warung-wooden/10 p-4 rounded-xl border border-warung-accent/20">
                <div className="p-2 rounded-full bg-gradient-to-r from-warung-accent to-warung-warm text-white">
                  <Store className="h-5 w-5" />
                </div>
                <span className="text-sm font-medium text-warung-dark">{t('hero.feature1')}</span>
              </div>
              <div className="flex items-center space-x-3 bg-avax-primary/10 p-4 rounded-xl border border-avax-primary/20">
                <div className="p-2 rounded-full bg-gradient-to-r from-avax-primary to-avax-secondary text-white">
                  <Coins className="h-5 w-5" />
                </div>
                <span className="text-sm font-medium text-avax-primary">{t('hero.feature2')}</span>
              </div>
              <div className="flex items-center space-x-3 bg-gradient-to-r from-avax-accent/10 to-warung-warm/10 p-4 rounded-xl border border-avax-accent/20">
                <div className="p-2 rounded-full bg-gradient-to-r from-avax-accent to-warung-accent text-white">
                  <Brain className="h-5 w-5" />
                </div>
                <span className="text-sm font-medium text-warung-dark">{t('hero.feature3')}</span>
              </div>
            </div>

            {/* Avalanche Network Benefits */}
            <div className="grid grid-cols-2 gap-4 pt-2">
              <div className="flex items-center space-x-2">
                <Zap className="h-4 w-4 text-avax-secondary" />
                <span className="text-sm text-warung-muted">Sub-second Finality</span>
              </div>
              <div className="flex items-center space-x-2">
                <Shield className="h-4 w-4 text-avax-primary" />
                <span className="text-sm text-warung-muted">Bank-level Security</span>
              </div>
              <div className="flex items-center space-x-2">
                <Globe className="h-4 w-4 text-warung-accent" />
                <span className="text-sm text-warung-muted">Global Accessibility</span>
              </div>
              <div className="flex items-center space-x-2">
                <Coins className="h-4 w-4 text-avax-accent" />
                <span className="text-sm text-warung-muted">Low Gas Fees</span>
              </div>
            </div>
          </div>
          
          {/* Hero Image with Fusion Design */}
          <div className="relative animate-slide-down">
            {/* Traditional Warung Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-warung-wooden/20 to-warung-warm/30 rounded-3xl transform rotate-3"></div>
            
            {/* Main Image Container */}
            <div className="relative z-10 warung-card rounded-3xl overflow-hidden transform -rotate-1 hover:rotate-0 transition-transform duration-500">
              <div className="bg-gradient-to-br from-white to-avax-primary/5 p-8">
                <img 
                  src="/warungsayur.png" 
                  alt="Warung Sayur Digital powered by Avalanche" 
                  className="w-full h-full object-contain filter drop-shadow-xl"
                />
                
                {/* Avalanche Network Overlay */}
                <div className="absolute top-4 right-4 bg-avax-primary text-white px-3 py-1 rounded-full text-xs font-medium">
                  AVAX Powered
                </div>
                
                {/* Traditional Elements Overlay */}
                <div className="absolute bottom-4 left-4 bg-warung-wooden/90 backdrop-blur-sm text-warung-dark px-3 py-1 rounded-full text-xs font-medium border border-warung-accent/30">
                  Warung Tradisional
                </div>
              </div>
            </div>
            
            {/* Floating Elements */}
            <div className="absolute -top-6 -right-6 -z-10 rounded-2xl w-full h-full bg-gradient-to-br from-avax-primary/20 to-avax-secondary/20 blur-2xl opacity-50"></div>
            <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-warung-accent/30 rounded-full blur-xl"></div>
          </div>
        </div>
        
        {/* CTA Section with Fusion Design */}
        <div className="mt-24 text-center">
          <div className="warung-card relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 bg-gradient-to-r from-avax-primary/5 via-warung-warm/10 to-avax-secondary/5"></div>
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-avax-primary via-warung-accent to-avax-secondary"></div>
            
            <div className="relative flex flex-col md:flex-row items-center justify-between p-8 animate-scale-in">
              <div className="space-y-3 mb-6 md:mb-0">
                <div className="flex items-center justify-center md:justify-start space-x-2 mb-2">
                  <div className="w-6 h-6 bg-gradient-to-r from-avax-primary to-avax-secondary rounded-full flex items-center justify-center">
                    <Zap className="w-3 h-3 text-white" />
                  </div>
                  <span className="text-sm font-medium text-avax-primary">Avalanche Network Integration</span>
                </div>
                <h3 className="text-2xl font-bold text-warung-dark">{t('hero.cta.title')}</h3>
                <p className="text-warung-muted max-w-md">{t('hero.cta.description')}</p>
              </div>
              <Link to="/products" className="btn-avalanche-large group">
                <span>{t('hero.cta.button')}</span>
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
