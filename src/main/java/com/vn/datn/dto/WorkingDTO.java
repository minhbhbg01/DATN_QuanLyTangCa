package com.vn.datn.dto;

import com.vn.datn.dto.ProjectDTO;
import com.vn.datn.entities.RoleEnum;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class WorkingDTO {
    private Integer id;
    private RoleEnum role;
    private String roleStaff;
    private Date startDate;
    private Date endDate;
    private ProjectDTO project;
}
