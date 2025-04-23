package com.vn.datn.service;

import com.vn.datn.dto.ProjectDTO;
import com.vn.datn.entities.Project;
import com.vn.datn.entities.Working;
import com.vn.datn.repository.ProjectRepository;
import com.vn.datn.repository.WorkingRepository;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;


@Service
public class ProjectService {
    private final ProjectRepository projectRepository;
    private final WorkingRepository workingRepository;

    public ProjectService(ProjectRepository projectRepository, WorkingRepository workingRepository) {
        this.projectRepository = projectRepository;
        this.workingRepository = workingRepository;
    }

    public Project createProject(Project project) {
        return projectRepository.save(project);
    }

    public Working createWorking(Working working) {
        return workingRepository.save(working);
    }
    public ProjectDTO convertToDTO(Project project) {
        ProjectDTO projectDTO = new ProjectDTO();
        projectDTO.setId(project.getId());
        projectDTO.setNameProject(project.getNameProject());
        projectDTO.setProjectCode(project.getProjectCode());
        projectDTO.setStartDate(project.getStartDate());
        projectDTO.setEndDate(project.getEndDate());
        projectDTO.setWorkings(project.getWorkings());

        return projectDTO;
    }

    public ProjectDTO getProjectDTOById(int id) {
        Project project = projectRepository.findById(id).orElse(null);
        if (project == null) {
            return null;
        }
        return convertToDTO(project);
    }

    public List<ProjectDTO> getAll() {
        List<Project> projects = projectRepository.findAll();
        List<ProjectDTO> projectDTOs = new ArrayList<>();
        for (Project project : projects) {
            ProjectDTO projectDTO = convertToDTO(project);
            projectDTOs.add(projectDTO);
        }
        return projectDTOs;
    }

}
