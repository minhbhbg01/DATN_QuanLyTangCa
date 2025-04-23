package com.vn.datn.service;

import com.vn.datn.repository.WorkingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


@Service
public class WorkingService {
    private final WorkingRepository workingRepository;

    @Autowired
    public WorkingService(WorkingRepository workingRepository) {
        this.workingRepository = workingRepository;
    }

}