package com.vn.datn.dto;

import com.vn.datn.entities.RoleEnum;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class StaffDTO {
    private Integer id;
    private String name;
    private String email;
    private String rank;
    private Double salary;
    private String department;
    private String password;
    private String rePassword;
    List<WorkingDTO> workingDTOS;
}
