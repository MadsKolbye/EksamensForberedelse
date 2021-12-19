package mads.eksamensforberedelse1_0;

import mads.eksamensforberedelse1_0.models.Boss;
import mads.eksamensforberedelse1_0.repositories.BossRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.List;

import static org.assertj.core.api.AssertionsForInterfaceTypes.assertThat;
import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
class EksamensForberedelse10ApplicationTests {

    @Autowired
    BossRepository bossRepository;

    @Test
    public void testCreate () {
        Boss b = new Boss();
        b.setId(5L);
        b.setName("Ragnaros");
        b.setAbility("Wrath of Ragnaros");
        b.setImage("https://image.pngaaa.com/474/5650474-middle.png");
        bossRepository.save(b);
        assertNotNull(bossRepository.findById(5L));
    }

    @Test
    public void testReadAll(){
        List<Boss> list = bossRepository.findAll();
        assertThat(list).size().isGreaterThan(0);
    }

    @Test
    public void testSingleBoss(){
        Boss boss = bossRepository.findById(3L).get();
        assertEquals("Gehennas", boss.getName());
    }

    @Test
    public void testUpdateBoss(){
        Boss b = bossRepository.findById(1L).get();
        b.setName("Lucifron");
        bossRepository.save(b);
        assertNotEquals("Rag", bossRepository.findById(1L).get().getName());
    }

    @Test
    public void testDeleteBoss(){
        bossRepository.deleteById(49L);
        assertThat(bossRepository.existsById(49L)).isFalse();
    }

}
