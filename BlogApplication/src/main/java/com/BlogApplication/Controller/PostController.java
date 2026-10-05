package com.BlogApplication.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.BlogApplication.Service.PostService;
import com.BlogApplication.model.Post;

@RestController
@RequestMapping("/api/posts")
@CrossOrigin(origins = "http://localhost:5173")
public class PostController {
	
	@Autowired
	private PostService service;
	
	@GetMapping
	public List<Post> getAll()
	{
		return service.getAll();
	}
	
    @GetMapping("/{id}")
	public Post getById(@PathVariable Long id)
	{
		return service.getById(id);
	}
	
    @PostMapping
    public Post create(@RequestBody Post post) {
    	return service.create(post);
    	
    }
    
    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id)
    {
    	service.delete(id);
    }
    
    
    @PutMapping("/{id}")
    public Post update(@PathVariable Long id, @RequestBody Post post)
    {
    	return service.update(id, post);
    }

}
