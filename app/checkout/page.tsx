'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

declare global {
  interface Window {
    ShopifyBuy?: any;
  }
}

export default function CheckoutPage() {
  useEffect(() => {
    const scriptURL = 'https://sdks.shopifycdn.com/buy-button/latest/buy-button-storefront.min.js';
    
    function ShopifyBuyInit() {
      if (window.ShopifyBuy && window.ShopifyBuy.UI) {
        const client = window.ShopifyBuy.buildClient({
          domain: 'wqmhc5-9z.myshopify.com',
          storefrontAccessToken: '469437dc04e3156776d4262f64b71cad',
        });
        
        window.ShopifyBuy.UI.onReady(client).then(function (ui: any) {
          ui.createComponent('product', {
            id: '7959774724195',
            node: document.getElementById('product-component-1770473321940'),
            moneyFormat: '%24%7B%7Bamount%7D%7D',
            options: {
              "product": {
                "styles": {
                  "product": {
                    "@media (min-width: 601px)": {
                      "max-width": "calc(25% - 20px)",
                      "margin-left": "20px",
                      "margin-bottom": "50px"
                    }
                  }
                },
                "buttonDestination": "checkout",
                "text": {
                  "button": "Buy now"
                }
              },
              "productSet": {
                "styles": {
                  "products": {
                    "@media (min-width: 601px)": {
                      "margin-left": "-20px"
                    }
                  }
                }
              },
              "modalProduct": {
                "contents": {
                  "img": false,
                  "imgWithCarousel": true,
                  "button": false,
                  "buttonWithQuantity": true
                },
                "styles": {
                  "product": {
                    "@media (min-width: 601px)": {
                      "max-width": "100%",
                      "margin-left": "0px",
                      "margin-bottom": "0px"
                    }
                  }
                },
                "text": {
                  "button": "Add to cart"
                }
              },
              "option": {},
              "cart": {
                "text": {
                  "total": "Subtotal",
                  "button": "Checkout"
                },
                "popup": false
              },
              "toggle": {}
            },
          });
        });
      }
    }

    function loadScript() {
      const script = document.createElement('script');
      script.async = true;
      script.src = scriptURL;
      (document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(script);
      script.onload = ShopifyBuyInit;
    }

    if (window.ShopifyBuy) {
      if (window.ShopifyBuy.UI) {
        ShopifyBuyInit();
      } else {
        loadScript();
      }
    } else {
      loadScript();
    }

    return () => {
      // Cleanup if needed
      const existingScript = document.querySelector(`script[src="${scriptURL}"]`);
      if (existingScript) {
        existingScript.remove();
      }
    };
  }, []);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Link href="/">
              <Button variant="ghost" size="sm" className="gap-2">
                <ArrowLeft className="h-4 w-4" />
                Back to Home
              </Button>
            </Link>
            <h1 className="text-xl font-semibold">Checkout</h1>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="mx-auto max-w-4xl">
          <div className="mb-8 text-center">
            <h2 className="text-3xl font-bold mb-2">Complete Your Purchase</h2>
            <p className="text-muted-foreground">
              Secure checkout powered by Shopify
            </p>
          </div>

          {/* Shopify Buy Button Container */}
          <div className="flex justify-center items-start min-h-[400px]">
            <div id="product-component-1770473321940"></div>
          </div>
        </div>
      </main>
    </div>
  );
}
