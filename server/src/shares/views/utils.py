def out_share(share):
    return {
        'name': share.name,
        'device': share.device.name,
        'paths': [out_path(path) for path in share.paths]
    }

	
def out_path(path):
    return {
        'name': path.name,
        'path': path.path
    }
	
	
def out_aval_share(share):
    return {
        'owner': share.user.username,
        'name': share.name,
        'paths': [out_path(path) for path in share.paths]
    }