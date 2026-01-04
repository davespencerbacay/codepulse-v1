using CodePulse.API.Data;
using CodePulse.API.Modells.Domain;
using CodePulse.API.Modells.DTO;
using CodePulse.API.Repositories.Interface;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace CodePulse.API.Controllers
{
    // api/categories
    [Route("api/category")]  
    [ApiController]
    public class CategoriesController : ControllerBase
    {
        private readonly ICategoryRepository categoryRepository;

        public CategoriesController(ICategoryRepository categoryRepository)
        {
            this.categoryRepository = categoryRepository;
        }

        // POST: api/category
        [HttpPost]
        public async Task<IActionResult> CreateCategory([FromBody] CreateCategoryRequestDto request)
        {
            // Map DTO to Domain Model
            var category = new Category
            { 
                Name = request.Name,
                UrlHandle = request.UrlHandle
            };

            await categoryRepository.CreateAsync(category);

            // Domain model to DTO
            var response = new CategoryDto
            {
                Id = category.Id,
                Name = category.Name,
                UrlHandle = category.UrlHandle
            };

            return Ok(response);
        }

        // GET: api/category
        [HttpGet]
        public async Task<IActionResult> GetAllCategories()
        {
            var categories = await categoryRepository.GetAllAsync();
            var response = new List<CategoryDto>();

            // Map domain model to DTO
            foreach(var category in categories)
            {
                response.Add(new CategoryDto
                {
                    Id = category.Id,
                    Name = category.Name,
                    UrlHandle = category.UrlHandle
                });
            }

            return Ok(response);
        }

        // GET: api/category/:id
        [HttpGet]
        [Route("{Id:Guid}")]
        public async Task<IActionResult> GetCategoryById([FromRoute] Guid Id)
        {
            var existingCategory = await categoryRepository.GetById(Id);

            if(existingCategory is null)
            {
                return NotFound();
            }

            var response = new CategoryDto
            {
                Id = existingCategory.Id,
                Name = existingCategory.Name,
                UrlHandle = existingCategory.UrlHandle
            };

            return Ok(response);
        }

        // PUT: api/category/:id
        [HttpPut]
        [Route("{Id:Guid}")]
        public async Task<IActionResult> UpdateCategoryById([FromRoute] Guid Id, UpdateCategoryRequestDto request)
        {
            var category = new Category
            {
                Id = Id,
                Name = request.Name,
                UrlHandle = request.UrlHandle
            };

            category = await categoryRepository.UpdateAsync(category);

            if(category == null)
            {
                return NotFound();
            }

            // Convert domain model to DTO
            var response = new CategoryDto
            {
                Id = category.Id,
                Name = category.Name,
                UrlHandle = category.UrlHandle
            };

            return Ok(response);
        }
    }
}
