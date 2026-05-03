import { useCart, useCurrency, formatPrice, DEFAULT_CURRENCY } from '@/integrations';
import { X, ShoppingCart, Minus, Plus, Trash2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Image } from '@/components/ui/image';

export default function Cart() {
  const { items, totalPrice, isOpen, itemCount, isCheckingOut, actions } = useCart();
  const { currency } = useCurrency();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={actions.closeCart}
            className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50"
          />

          {/* Cart Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 h-full w-full sm:w-[500px] bg-optional-navy shadow-2xl z-50 flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-foreground/10">
              <div className="flex items-center gap-3">
                <ShoppingCart className="w-6 h-6 text-accent-gold" />
                <h2 className="font-heading text-2xl text-foreground">
                  Cart ({itemCount})
                </h2>
              </div>
              <button
                onClick={actions.closeCart}
                className="text-foreground hover:text-accent-gold transition-colors"
                aria-label="Close cart"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto p-6">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center">
                  <ShoppingCart className="w-16 h-16 text-foreground/20 mb-4" />
                  <p className="font-paragraph text-lg text-foreground/60">Your cart is empty</p>
                </div>
              ) : (
                <div className="space-y-6">
                  {items.map((item) => (
                    <div key={item.id} className="bg-background p-4 rounded">
                      <div className="flex gap-4">
                        {item.image && (
                          <div className="w-20 h-20 flex-shrink-0 rounded overflow-hidden">
                            <Image
                              src={item.image}
                              alt={item.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        )}
                        <div className="flex-1 min-w-0">
                          <h3 className="font-paragraph text-base text-foreground font-medium mb-2 truncate">
                            {item.name}
                          </h3>
                          <p className="font-paragraph text-lg text-accent-gold font-semibold mb-3">
                            {formatPrice(item.price, currency ?? DEFAULT_CURRENCY)}
                          </p>
                          
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <button
                                onClick={() => actions.updateQuantity(item, Math.max(1, item.quantity - 1))}
                                className="w-8 h-8 flex items-center justify-center bg-optional-navy text-foreground rounded hover:bg-accent-gold hover:text-secondary-foreground transition-colors"
                                aria-label="Decrease quantity"
                              >
                                <Minus className="w-4 h-4" />
                              </button>
                              <span className="font-paragraph text-foreground font-medium w-8 text-center">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() => actions.updateQuantity(item, item.quantity + 1)}
                                className="w-8 h-8 flex items-center justify-center bg-optional-navy text-foreground rounded hover:bg-accent-gold hover:text-secondary-foreground transition-colors"
                                aria-label="Increase quantity"
                              >
                                <Plus className="w-4 h-4" />
                              </button>
                            </div>
                            
                            <button
                              onClick={() => actions.removeFromCart(item)}
                              className="text-foreground/60 hover:text-destructive transition-colors"
                              aria-label="Remove item"
                            >
                              <Trash2 className="w-5 h-5" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="border-t border-foreground/10 p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="font-heading text-xl text-foreground">Total:</span>
                  <span className="font-heading text-3xl text-accent-gold">
                    {formatPrice(totalPrice, currency ?? DEFAULT_CURRENCY)}
                  </span>
                </div>
                
                <button
                  onClick={actions.checkout}
                  disabled={isCheckingOut}
                  className="w-full bg-accent-gold text-secondary-foreground font-paragraph font-semibold px-6 py-4 rounded transition-all hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isCheckingOut ? 'Processing...' : 'Proceed to Checkout'}
                </button>
                
                <button
                  onClick={actions.closeCart}
                  className="w-full bg-transparent text-foreground border border-foreground/20 font-paragraph font-medium px-6 py-3 rounded transition-all hover:bg-background"
                >
                  Continue Shopping
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
