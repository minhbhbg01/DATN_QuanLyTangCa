package com.vn.datn.service;

import com.vn.datn.dto.ClaimDTO;
import com.vn.datn.dto.ProjectDTO;
import com.vn.datn.dto.StaffDTO;
import com.vn.datn.entities.*;
import com.vn.datn.repository.ClaimRepository;
import com.vn.datn.repository.ProjectRepository;
import com.vn.datn.repository.StaffRepository;
import com.vn.datn.repository.WorkingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


@Service
public class ClaimService {

    @Autowired
    private ClaimRepository claimRepository;

    @Autowired
    private StaffRepository staffRepository;

    @Autowired
    private ProjectRepository projectRepository;

    public Claim createClaim(ClaimDTO claimDTO) {
        Claim claim = new Claim();
        claim.setStatus(claimDTO.getStatus());
        claim.setClaimDate(claimDTO.getClaimDate());
        claim.setDay(claimDTO.getDay());
        claim.setFromDate(claimDTO.getFromDate());
        claim.setToDate(claimDTO.getToDate());
        claim.setTotalHours(claimDTO.getTotalHours());
        claim.setRemarks(claimDTO.getRemarks());

        // Lấy thông tin nhân viên từ claimDTO
        StaffDTO staffDTO = claimDTO.getStaffDTO();
        Staff staff = staffRepository.findById(staffDTO.getId()).orElseThrow(() -> new IllegalArgumentException("Invalid staff ID"));
        claim.setStaff(staff);

        // Lấy thông tin dự án từ claimDTO
        ProjectDTO projectDTO = claimDTO.getProjectDTO();
        Project project = projectRepository.findById(projectDTO.getId()).orElseThrow(() -> new IllegalArgumentException("Invalid project ID"));
        claim.setProject(project);

        return claimRepository.save(claim);
    }

}
