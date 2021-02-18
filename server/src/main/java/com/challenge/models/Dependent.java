package com.challenge.models;

import com.challenge.models.costs.DeductionCalculator;
import com.challenge.models.costs.DependentDefaultDeductionCalculator;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;
import java.io.Serializable;

@Data
@NoArgsConstructor
@EqualsAndHashCode
@Entity(name = "dependent")
public class Dependent implements Serializable {
    private String name;

    private int id;

    @Id
    @GeneratedValue(strategy= GenerationType.AUTO,generator="native")
    @GenericGenerator(name = "native",strategy = "native")
    @JsonIgnore
    private int generatedId;

    @JsonIgnore
    @Transient
    private DeductionCalculator deductionCalculator = new DependentDefaultDeductionCalculator();

    @ManyToOne
    @JoinColumn(name = "employee_id")
    @JsonIgnore
    private Employee employee;

    public Dependent(String name, int id) {
        this.name = name;
        this.id = id;
    }

    public void applyDiscounts() {
        this.deductionCalculator = this.deductionCalculator.determineDeductionCalculators(this.getName(), this.getDeductionCalculator());
    }
}
