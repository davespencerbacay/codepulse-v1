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

        public BlogsController(IBlogRepository blogRepository)
        {
            this.blogRepository = blogRepository;
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
                UrlHandle = request.UrlHandle
            };

            await blogRepository.CreateAsync(blog);

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
                UrlHandle = blog.UrlHandle
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
                    UrlHandle = blog.UrlHandle
                });
            }
            return Ok(response);
        }
    }
}
