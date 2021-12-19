package mads.eksamensforberedelse1_0.models;

import lombok.Data;

import javax.persistence.*;

@Data
@Table(name = "Bosses")
@Entity
public class Boss {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column
    private Long id;

    @Column
    private String name;

    @Column
    private int health;

    @Column
    private String ability;

    @Column
    private String image;

}
