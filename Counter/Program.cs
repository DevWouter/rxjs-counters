using Counter;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

var trackers = new List<Tracker>();

app.MapGet("/counters", () => trackers.Select(x => x.Name)).WithOpenApi();
app.MapPost("/counters", (CreateTrackerRequest body) =>
{
    if (trackers.Any(x => x.Name == body.Name)) throw new Exception("Counter already exists");
    trackers.Add(new Tracker() { Name = body.Name });
}).WithOpenApi();
app.MapGet("/counters/{name:required}", (string name) => trackers.Single(x => x.Name == name)).WithOpenApi();
app.MapDelete("/counters/{name:required}", (string name) => trackers.RemoveAll(x => x.Name == name)).WithOpenApi();
app.MapPut("/counters/{name:required}", (string name, int value) => trackers.Single(x => x.Name == name).Value = value).WithOpenApi();

app.Run();