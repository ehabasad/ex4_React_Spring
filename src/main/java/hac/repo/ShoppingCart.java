package hac.repo;

import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

/**
 * Represents a shopping cart that stores a collection of items.
 */
@Component
public class ShoppingCart {
    private final List<Integer> items;

    /**
     * Constructs an empty shopping cart.
     */
    public ShoppingCart() {
        this.items = new ArrayList<>();
    }

    /**
     * Retrieves the items in the shopping cart.
     *
     * @return The list of items in the shopping cart.
     */
    public List<Integer> getItems() {
        return items;
    }

    /**
     * Adds an item to the shopping cart.
     *
     * @param id The ID of the item to add.
     */
    public void addItem(int id) {
        items.add(id); // Add the item to the cart
        Set<Integer> uniqueItems = new HashSet<>(items); // Remove duplicates using a HashSet
        items.clear(); // Clear the existing items list
        items.addAll(uniqueItems); // Add the unique items back to the list
    }

    /**
     * Removes an item from the shopping cart.
     *
     * @param id The ID of the item to remove.
     */
    public void removeItem(int id) {
        items.remove(Integer.valueOf(id)); // Remove the item from the cart using its value
    }

    /**
     * Clears the shopping cart, removing all items.
     */
    public void clearCart() {
        items.clear(); // Clear all items from the cart
    }

    /**
     * Retrieves the number of items in the shopping cart.
     *
     * @return The number of items in the shopping cart.
     */
    public int getItemCount() {
        return items.size(); // Get the count of items in the cart
    }
}
