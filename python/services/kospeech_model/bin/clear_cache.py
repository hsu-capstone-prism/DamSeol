import torch, gc

print("Clearing cache...")
gc.collect()
torch.cuda.empty_cache()
print("Cache cleared.")