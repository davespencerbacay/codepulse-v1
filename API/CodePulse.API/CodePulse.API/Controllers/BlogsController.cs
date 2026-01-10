using CodePulse.API.Models.Domain;
using CodePulse.API.Models.DTO;
using CodePulse.API.Repositories.Interface;
using Microsoft.AspNetCore.Mvc;


namespace CodePulse.API.Controllers
{
    [Route("api/blogs")]
    [ApiController]
    public class BlogsController : ControllerBase
    {
        private readonly IBlogRepository blogRepository;
        private readonly ICategoryRepository categoryRepository;

        public BlogsController(IBlogRepository blogRepository, ICategoryRepository categoryRepository)
        {
            this.blogRepository = blogRepository;
            this.categoryRepository = categoryRepository;
        }

        // POST: /api/blogs
        [HttpPost]
        public async Task<IActionResult> CreateBlog([FromBody] CreateBlogsDto request)
        {
            // Convert DTO to domain model 
            var blog = new BlogPost
            {
                Author = request.Author,
                Content = request.Content,
                FeaturedImageUrl = request.FeaturedImageUrl,
                IsVisible = request.IsVisible,
                PublishedDate = request.PublishedDate,
                ShortDescription = request.ShortDescription,
                Title = request.Title,
                UrlHandle = request.UrlHandle,
                Categories = new List<Category>()
            };

            foreach (var categoryGuid in request.Categories)
            {
                var existingCategory = await categoryRepository.GetById(categoryGuid);
                if(existingCategory != null)
                {
                    blog.Categories.Add(existingCategory);
                }
            }

            blog = await blogRepository.CreateAsync(blog);

            var response = new BlogDto
            {
                Title = blog.Title,
                Content = blog.Content,
                Author = blog.Author,
                PublishedDate = blog.PublishedDate,
                FeaturedImageUrl = blog.FeaturedImageUrl,
                Id = blog.Id,
                IsVisible = blog.IsVisible,
                ShortDescription = blog.ShortDescription,
                UrlHandle = blog.UrlHandle,
                Categories = blog.Categories.Select(x => new CategoryDto
                {
                    Id = x.Id,
                    Name = x.Name,
                    UrlHandle = x.UrlHandle
                }).ToList()
            };
            return Ok(response);
        }
        // GET: /api/blogs
        [HttpGet]
        public async Task<IActionResult> GetAllBlogs()
        {
            var blogs = await blogRepository.GetAllAsync();
            var response = new List<BlogDto>();

            foreach (var blog in blogs)
            {
                response.Add(new BlogDto
                {
                    Id = blog.Id,
                    Author = blog.Author,
                    Content = blog.Content,
                    FeaturedImageUrl = blog.FeaturedImageUrl,
                    IsVisible = blog.IsVisible,
                    PublishedDate = blog.PublishedDate,
                    ShortDescription = blog.ShortDescription,
                    Title = blog.Title,
                    UrlHandle = blog.UrlHandle,
                    Categories = blog.Categories.Select(x => new CategoryDto
                    {
                        Id = x.Id,
                        Name = x.Name,
                        UrlHandle = x.UrlHandle
                    }).ToList()
                });
            }
            return Ok(response);
        }

        // GET: /api/blogs/:blogId
        [HttpGet]
        [Route("{blogId:Guid}")]
        public async Task<IActionResult> GetBlogById(Guid blogId)
        {
            var blogPost = await blogRepository.GetByIdAsync(blogId);

            if (blogPost is null)
            {
                return NotFound();
            }

            var response = new BlogDto
            {
                Id = blogPost.Id,
                Title = blogPost.Title,
                Content = blogPost.Content,
                Author = blogPost.Author,
                PublishedDate = blogPost.PublishedDate,
                FeaturedImageUrl = blogPost.FeaturedImageUrl,
                IsVisible = blogPost.IsVisible,
                ShortDescription = blogPost.ShortDescription,
                UrlHandle = blogPost.UrlHandle,
                Categories = blogPost.Categories.Select(x => new CategoryDto
                {
                    Id = x.Id,
                    Name = x.Name,
                    UrlHandle = x.UrlHandle
                }).ToList()
            };

            return Ok(response);
        }


        // PUT: /api/blogs/:blogId
        [HttpPut]
        [Route("{blogId:Guid}")]
        public async Task<IActionResult> UpdateBlogById([FromRoute] Guid blogId, UpdateBlogRequestDto request)
        {
            var blog = new BlogPost
            {
                Id = blogId,
                Author = request.Author,
                Content = request.Content,
                FeaturedImageUrl = request.FeaturedImageUrl,
                IsVisible = request.IsVisible,
                PublishedDate = request.PublishedDate,
                ShortDescription = request.ShortDescription,
                Title = request.Title,
                UrlHandle = request.UrlHandle,
                Categories = new List<Category>()
            };

            foreach(var categoryGuid in request.Categories)
            {
                var existingCategory = await categoryRepository.GetById(categoryGuid);
                if(existingCategory != null)
                {
                    blog.Categories.Add(existingCategory);
                }
            }

            // Call repository to update blog domain model
            var updatedBlog = await blogRepository.UpdateAsync(blog);
            if(updatedBlog == null)
            {
                return NotFound();
            }

            var response = new BlogDto
            {
                Id = blog.Id,
                Title = blog.Title,
                Content = blog.Content,
                Author = blog.Author,
                PublishedDate = blog.PublishedDate,
                FeaturedImageUrl = blog.FeaturedImageUrl,
                IsVisible = blog.IsVisible,
                ShortDescription = blog.ShortDescription,
                UrlHandle = blog.UrlHandle,
                Categories = blog.Categories.Select(x => new CategoryDto
                {
                    Id = x.Id,
                    Name = x.Name,
                    UrlHandle = x.UrlHandle
                }).ToList()
            };

            return Ok(response);
        }

        // DELETE: /api/blogs/:blogId
        [HttpDelete]
        [Route("{blogId:Guid}")]
        public async Task<IActionResult> DeleteBlogById([FromRoute] Guid blogId)
        {
            var deletedBlog = await blogRepository.DeleteAsync(blogId);
            if(deletedBlog == null)
            {
                return NotFound();
            }

            // Convert domain model to DTO
            var response = new BlogDto
            {
                Id = deletedBlog.Id,
                Title = deletedBlog.Title,
                Content = deletedBlog.Content,
                Author = deletedBlog.Author,
                PublishedDate = deletedBlog.PublishedDate,
                FeaturedImageUrl = deletedBlog.FeaturedImageUrl,
                IsVisible = deletedBlog.IsVisible,
                ShortDescription = deletedBlog.ShortDescription,
                UrlHandle = deletedBlog.UrlHandle
            };

            return Ok(response);

        }
    }
}
