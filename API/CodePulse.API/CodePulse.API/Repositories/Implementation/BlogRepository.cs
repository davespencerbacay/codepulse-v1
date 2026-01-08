using CodePulse.API.Data;
using CodePulse.API.Models.Domain;
using CodePulse.API.Repositories.Interface;
using Microsoft.EntityFrameworkCore;

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
            
            return await dbContext.BlogPosts
                .Include(x => x.Categories)
                .FirstOrDefaultAsync(x => x.Id == blog.Id);
        } 

        public async Task<IEnumerable<BlogPost>> GetAllAsync()
        {
            return await dbContext.BlogPosts.Include(x => x.Categories).ToListAsync();
        }

        public async Task<BlogPost?> GetByIdAsync(Guid blogId)
        {
            return await dbContext.BlogPosts.Include(x => x.Categories).FirstOrDefaultAsync(x => x.Id == blogId);
        }
    }
}
