import React, { useState } from 'react';
import { Search, Menu, X, ArrowRight } from 'lucide-react';
import type { ViewRoute } from '../../types';

interface HeaderProps {
  currentRoute: ViewRoute;
  onNavigate: (route: ViewRoute) => void;
  onOpenSearch: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentRoute,
  onNavigate,
  onOpenSearch
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isNavActive = (name: string) => {
    return currentRoute.name === name;
  };

  const handleNav = (route: ViewRoute) => {
    onNavigate(route);
    setMobileMenuOpen(false);
  };

  return (
    <header className="header-sticky">
      <div className="container">
        <div className="flex items-center justify-between h-18 md:h-20">
          {/* LOGO */}
          <div
            onClick={() => handleNav({ name: 'home' })}
            className="flex items-center gap-2 cursor-pointer select-none group"
          >
            <div className="w-7 h-7 rounded-[4px] bg-[#111111] flex items-center justify-center text-white transition-transform group-hover:scale-105 shadow-xs">
              <span className="w-2.5 h-2.5 bg-[#1677FF] rounded-[2px]" />
            </div>
            <div>
              <span className="font-heading font-extrabold text-xl md:text-2xl tracking-tight text-[#111111] font-sans block leading-none">
                STUDYKIT
              </span>
              <span className="text-[9px] font-bold tracking-widest text-[#667085] uppercase font-mono hidden sm:block">
                LIBRAIRIE PROF & ÉLÈVE
              </span>
            </div>
          </div>

          {/* DESKTOP NAVIGATION */}
          <nav className="hidden lg:flex items-center gap-8 text-sm font-medium">
            <button
              onClick={() => handleNav({ name: 'home' })}
              className={`transition-colors py-1 relative ${
                isNavActive('home')
                  ? 'text-[#1677FF] font-bold'
                  : 'text-[#475467] hover:text-[#111111]'
              }`}
            >
              Accueil
              {isNavActive('home') && (
                <span className="absolute -bottom-1 left-0 right-0 h-[2px] bg-[#1677FF] rounded-full" />
              )}
            </button>

            <button
              onClick={() => handleNav({ name: 'shop' })}
              className={`transition-colors py-1 relative ${
                isNavActive('shop')
                  ? 'text-[#1677FF] font-bold'
                  : 'text-[#475467] hover:text-[#111111]'
              }`}
            >
              Tous les Ebooks
              {isNavActive('shop') && (
                <span className="absolute -bottom-1 left-0 right-0 h-[2px] bg-[#1677FF] rounded-full" />
              )}
            </button>

            <button
              onClick={() => handleNav({ name: 'faq' })}
              className={`transition-colors py-1 relative ${
                isNavActive('faq')
                  ? 'text-[#1677FF] font-bold'
                  : 'text-[#475467] hover:text-[#111111]'
              }`}
            >
              FAQ
              {isNavActive('faq') && (
                <span className="absolute -bottom-1 left-0 right-0 h-[2px] bg-[#1677FF] rounded-full" />
              )}
            </button>

            <button
              onClick={() => handleNav({ name: 'about' })}
              className={`transition-colors py-1 relative ${
                isNavActive('about')
                  ? 'text-[#1677FF] font-bold'
                  : 'text-[#475467] hover:text-[#111111]'
              }`}
            >
              À propos
              {isNavActive('about') && (
                <span className="absolute -bottom-1 left-0 right-0 h-[2px] bg-[#1677FF] rounded-full" />
              )}
            </button>
          </nav>

          {/* DESKTOP ACTIONS */}
          <div className="hidden md:flex items-center gap-3">
            <button
              onClick={onOpenSearch}
              className="p-2.5 rounded-lg text-[#667085] hover:text-[#111111] hover:bg-[#F5F7FA] transition-colors"
              title="Rechercher un ebook"
              aria-label="Rechercher"
            >
              <Search size={19} />
            </button>

            <a
              href="https://wa.me/2290199563785?text=Bonjour,%20je%20souhaite%20des%20informations%20sur%20les%20cours%20de%20maison%20en%20matières%20scientifiques."
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-sm font-bold flex items-center gap-1.5 text-white bg-[#25D366] hover:bg-[#1EBE5D] shadow-xs border-none"
              title="Contacter sur WhatsApp pour cours de maison"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.885m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
              </svg>
              <span>Cours de maison</span>
            </a>

            <button
              onClick={() => handleNav({ name: 'shop' })}
              className="btn btn-primary btn-sm ml-1 font-bold flex items-center gap-1.5"
            >
              <span>Voir le catalogue</span>
              <ArrowRight size={14} />
            </button>
          </div>

          {/* MOBILE ACTIONS */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={onOpenSearch}
              className="p-2 text-[#667085] hover:text-[#111111]"
              aria-label="Rechercher"
            >
              <Search size={20} />
            </button>

            <a
              href="https://wa.me/2290199563785?text=Bonjour,%20je%20souhaite%20des%20informations%20sur%20les%20cours%20de%20maison%20en%20matières%20scientifiques."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 px-2.5 py-1.5 text-[11px] font-bold text-white bg-[#25D366] hover:bg-[#1EBE5D] rounded-md shadow-xs"
            >
              <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.885m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
              </svg>
              <span>Cours</span>
            </a>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-[#111111] rounded-lg hover:bg-[#F5F7FA]"
              aria-label="Menu"
            >
              {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {/* MOBILE MENU */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-[#EAECF0] bg-white animate-fadeIn">
            <div className="flex flex-col space-y-1 pb-3">
              <button
                onClick={() => handleNav({ name: 'home' })}
                className={`text-left px-3 py-2.5 rounded-lg text-sm font-semibold transition-colors ${
                  isNavActive('home')
                    ? 'bg-[#EBF3FF] text-[#1677FF]'
                    : 'text-[#1D2939] hover:bg-[#F5F7FA]'
                }`}
              >
                Accueil
              </button>
              <button
                onClick={() => handleNav({ name: 'shop' })}
                className={`text-left px-3 py-2.5 rounded-lg text-sm font-semibold transition-colors ${
                  isNavActive('shop')
                    ? 'bg-[#EBF3FF] text-[#1677FF]'
                    : 'text-[#1D2939] hover:bg-[#F5F7FA]'
                }`}
              >
                Tous les Ebooks
              </button>
              <button
                onClick={() => handleNav({ name: 'faq' })}
                className={`text-left px-3 py-2.5 rounded-lg text-sm font-semibold transition-colors ${
                  isNavActive('faq')
                    ? 'bg-[#EBF3FF] text-[#1677FF]'
                    : 'text-[#1D2939] hover:bg-[#F5F7FA]'
                }`}
              >
                FAQ
              </button>
              <button
                onClick={() => handleNav({ name: 'about' })}
                className={`text-left px-3 py-2.5 rounded-lg text-sm font-semibold transition-colors ${
                  isNavActive('about')
                    ? 'bg-[#EBF3FF] text-[#1677FF]'
                    : 'text-[#1D2939] hover:bg-[#F5F7FA]'
                }`}
              >
                À propos
              </button>
            </div>

            <div className="pt-3 border-t border-[#EAECF0]">
              <button
                onClick={() => handleNav({ name: 'shop' })}
                className="btn btn-primary btn-block text-sm py-2.5 font-bold"
              >
                Accéder au catalogue complet
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
