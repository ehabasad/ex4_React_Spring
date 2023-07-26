package hac.Controller;

import hac.repo.ShoppingCart;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.text.DecimalFormat;
import java.util.List;

/**
 * Controller class that handles requests related to the shopping cart.
 */
@RestController
@RequestMapping("/")
public class ShoppingCartController {
    @Autowired
    private ShoppingCart cart;

    private static final Double PRICE = 3.99;

    /**
     * Adds an item to the shopping cart.
     *
     * @param itemId The ID of the item to add.
     * @return ResponseEntity containing the number of items in the cart.
     */
    @PostMapping("/addItem/{itemId}")
    public ResponseEntity<Integer> addItemToCart(@PathVariable int itemId) {
        cart.addItem(itemId); // Add the item to the cart
        int itemCount = cart.getItemCount(); // Get the updated item count
        return ResponseEntity.ok(itemCount);
    }

    /**
     * Removes an item from the shopping cart.
     *
     * @param itemId The ID of the item to remove.
     * @return ResponseEntity containing the updated list of items in the cart or not found status if the item was not found.
     */
    @PostMapping("/removeItem")
    public ResponseEntity<List<Integer>> removeItemFromCart(@RequestParam int itemId) {
        cart.removeItem(itemId); // Remove the item from the cart
        List<Integer> cartItems = cart.getItems(); // Get the updated list of items
        return ResponseEntity.ok(cartItems);
    }

    /**
     * Retrieves the items in the shopping cart.
     *
     * @return ResponseEntity containing the list of items in the cart.
     */
    @GetMapping("/getCart")
    public ResponseEntity<List<Integer>> getCart() {
        List<Integer> cartItems = cart.getItems(); // Get the list of items in the cart
        return ResponseEntity.ok(cartItems);
    }

    /**
     * Resets the shopping cart, removing all items.
     *
     * @return ResponseEntity with a success message.
     */
    @GetMapping("/resetCart")
    public ResponseEntity<String> resetCart() {
        cart.clearCart(); // Clear all items from the cart
        return ResponseEntity.ok("Cart reset successfully");
    }

    /**
     * Retrieves the length of the shopping cart.
     *
     * @return ResponseEntity containing the length.
     */
    @GetMapping("/getLength")
    public ResponseEntity<Integer> getLength() {
        int cartLength = cart.getItemCount(); // Get the length of the cart
        return ResponseEntity.ok(cartLength);
    }

    @GetMapping("/getCount")
    public ResponseEntity<String> getCount(){
        DecimalFormat decimalFormat = new DecimalFormat("#.##");
        return ResponseEntity.ok(decimalFormat.format(cart.getItemCount() * PRICE));
    }

}
