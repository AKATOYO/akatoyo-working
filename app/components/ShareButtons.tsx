"use client";

import { useState, useEffect } from "react";
import Head from "next/head";
import { toast } from "react-hot-toast";

export default function ShareButtons({ nombre, precio, descripcion, imagen_url }: { 
  nombre: string, 
  precio: number, 
  descripcion: string,
  imagen_url: string 
}) {
  const [copiado, setCopiado] = useState(false);

  const url = typeof window !== "undefined" ? window.location.href : "";
  const texto = `Mira este producto en Akatoyo: ${nombre} por $${precio.toLocaleString()}. ${descripcion}`;

  // Update Open Graph tags when props change
  useEffect(() => {
    if (typeof window === "undefined") return;
    
    const updateMetaTags = () => {
      const metaTags = [
        { property: "og:title", content: nombre },
        { property: "og:description", content: descripcion },
        { property: "og:image", content: imagen_url },
        { property: "og:url", content: url },
        { property: "og:type", content: "product" },
        { property: "product:price:amount", content: precio.toString() },
        { property: "product:price:currency", content: "MXN" },
        { property: "product:retailer", content: "Akatoyo" }
      ];

      metaTags.forEach(tag => {
        let element = document.querySelector(`meta[property="${tag.property}"]`);
        if (!element) {
          element = document.createElement("meta");
          element.setAttribute("property", tag.property);
          document.head.appendChild(element);
        }
        element.setAttribute("content", tag.content);
      });
    };

    updateMetaTags();
  }, [nombre, precio, descripcion, imagen_url, url]);

  const compartirWhatsApp = () => {
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(texto + " \nVer más: " + url)}`;
    window.open(whatsappUrl, "_blank");
  };

  const compartirFacebook = () => {
    const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
    window.open(facebookUrl, "_blank");
  };

  const compartirTwitter = () => {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(texto)}&url=${encodeURIComponent(url)}`;
    window.open(twitterUrl, "_blank");
  };

  const compartirLinkedIn = () => {
    const linkedInUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;
    window.open(linkedInUrl, "_blank");
  };

  const compartirNativo = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: nombre,
          text: descripcion,
          url: window.location.href,
        });
      } catch (error) {
        console.error('Error sharing:', error);
      }
    } else {
      // Fallback to copying the link
      copiarEnlace();
    }
  };

  const copiarEnlace = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopiado(true);
      toast.success("¡Enlace copiado al portapapeles!");
      setTimeout(() => setCopiado(false), 2000);
    } catch (error) {
      console.error('Error copying link:', error);
      toast.error("Error al copiar el enlace");
    }
  };

  return (
    <>
      <Head>
        <meta property="og:title" content={nombre} />
        <meta property="og:description" content={descripcion} />
        <meta property="og:image" content={imagen_url} />
        <meta property="og:url" content={url} />
        <meta property="og:type" content="product" />
        <meta property="product:price:amount" content={precio.toString()} />
        <meta property="product:price:currency" content="MXN" />
        <meta property="product:retailer" content="Akatoyo" />
      </Head>
      
      <div className="flex items-center gap-4 mt-6 pt-6 border-t border-zinc-800">
        <span className="text-sm text-zinc-500 font-medium">Compartir:</span>
        
        <button 
          onClick={compartirWhatsApp}
          className="text-zinc-400 hover:text-green-500 transition-colors"
          title="Compartir en WhatsApp"
          aria-label="Compartir en WhatsApp"
        >
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
          </svg>
        </button>

        <button 
          onClick={compartirFacebook}
          className="text-zinc-400 hover:text-blue-500 transition-colors"
          title="Compartir en Facebook"
          aria-label="Compartir en Facebook"
        >
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
          </svg>
        </button>

        <button 
          onClick={compartirTwitter}
          className="text-zinc-400 hover:text-sky-400 transition-colors"
          title="Compartir en X / Twitter"
          aria-label="Compartir en X / Twitter"
        >
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
          </svg>
        </button>

        <button 
          onClick={compartirLinkedIn}
          className="text-zinc-400 hover:text-blue-600 transition-colors"
          title="Compartir en LinkedIn"
          aria-label="Compartir en LinkedIn"
        >
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
          </svg>
        </button>

        <button 
          onClick={compartirNativo}
          className="text-zinc-400 hover:text-white transition-colors"
          title="Compartir"
          aria-label="Compartir"
        >
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92 1.61 0 2.92-1.31 2.92-2.92s-1.31-2.92-2.92-2.92z"/>
          </svg>
        </button>

        <button 
          onClick={copiarEnlace}
          className="text-zinc-400 hover:text-white transition-colors text-sm font-medium flex items-center gap-1 ml-auto"
          title={copiado ? "¡Copiado!" : "Copiar enlace"}
          aria-label={copiado ? "Enlace copiado" : "Copiar enlace"}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"/>
          </svg>
          {copiado ? "¡Copiado!" : "Copiar"}
        </button>
      </div>
    </>
  );
}
