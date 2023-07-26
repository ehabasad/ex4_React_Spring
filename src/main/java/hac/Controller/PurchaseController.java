package hac.Controller;

import hac.repo.Purchase;
import hac.repo.PurchaseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/purchases")
public class PurchaseController {
    @Autowired
    private PurchaseRepository purchaseRepository;  // this is the JPA repository (SQL database)

    @GetMapping("/showPurchases")
    public List<Purchase> showPurchases() {
        return purchaseRepository.findAll(); // this is a JPA method to get all the purchases
    }

    @PostMapping("/addPurchase")
    public Purchase addPurchase(@RequestBody Purchase purchase) {
        return purchaseRepository.save(purchase); // this is a JPA method to save a purchase to the database
    }
}