package mads.eksamensforberedelse1_0.controllers;

import mads.eksamensforberedelse1_0.models.Boss;
import mads.eksamensforberedelse1_0.repositories.BossRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
public class Bosses {

    @Autowired
    BossRepository bossRepository;

    @GetMapping("/bosses")
    public Iterable<Boss> getBosses() {
        return bossRepository.findAll();
    }

    @GetMapping("/bosses/{id}")
    public Boss getBossOnId(@PathVariable Long id){
        return bossRepository.findById(id).get();
    }

    @PostMapping("/bosses")
    public Boss createBoss(@RequestBody Boss bossBody){
        return bossRepository.save(bossBody);
    }

    @PutMapping("/bosses/{id}")
    public Boss updateBoss(@PathVariable Long id, @RequestBody Boss bossBody){
        bossBody.setId(id);
        return bossRepository.save(bossBody);
    }

    @PatchMapping("/bosses/{id}")
    public String patchBossById(@PathVariable Long id, @RequestBody Boss bossToUpdateWith){
        return bossRepository.findById(id).map(foundBoss -> {
            if(bossToUpdateWith.getName() != null) foundBoss.setName(bossToUpdateWith.getName());
            if(bossToUpdateWith.getHealth() != 0) foundBoss.setHealth(bossToUpdateWith.getHealth());
            if(bossToUpdateWith.getAbility() != null) foundBoss.setAbility(bossToUpdateWith.getAbility());
            if(bossToUpdateWith.getImage() != null) foundBoss.setImage(bossToUpdateWith.getImage());

            bossRepository.save(foundBoss);
            return "Boss updated";
        }).orElse("Boss not found...");
    }

    @DeleteMapping("/bosses/{id}")
    public void deleteBoss(@PathVariable Long id){
        bossRepository.deleteById(id);
    }

}
