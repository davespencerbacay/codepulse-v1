using CodePulse.API.Data;
using CodePulse.API.Models.Domain;
using CodePulse.API.Repositories.Interface;

namespace CodePulse.API.Repositories.Implementation
{
    public class BlogRepository : IBlogRepository
    {
        private readonly ApplicationDbContext dbContext;
        public BlogRepository(ApplicationDbContext dbContext)
        { 
            this.dbContext = dbContext;
        }

        public async Task<BlogPost> CreateAsync(BlogPost blog)
        {
            await dbContext.BlogPosts.AddAsync(blog);
            await dbContext.SaveChangesAsync();
            return blog;
        }
    }
}
