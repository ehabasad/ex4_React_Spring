package hac;

import hac.repo.ShoppingCart;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * Service class that provides additional functionality for the shopping cart.
 */
@Service
public class ShoppingCartService {
    @Autowired
    private ShoppingCart cart;

    /**
     * Retrieves the number of items in the shopping cart.
     *
     * @return The number of items in the cart.
     */
    public int getItemCount() {
        return cart.getItemCount();
    }
}
