package com.vn.datn.repository;

import com.vn.datn.entities.Staff;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;


public interface StaffRepository extends JpaRepository<Staff,Integer> {
    Staff findByEmail(String email);
    boolean existsByEmail(String email);
    boolean existsByName(String name);

}
