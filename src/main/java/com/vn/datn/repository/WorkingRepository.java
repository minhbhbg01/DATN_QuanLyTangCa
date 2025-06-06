package com.vn.datn.repository;

import com.vn.datn.entities.Working;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public interface WorkingRepository extends JpaRepository<Working,Integer> {
    List<Working> findByStaffId(Integer staffId);

    @Transactional
    List<Working> deleteAllByProjectId(Integer projectId);
}
