package co.kr.real;

import android.content.Intent;
import android.net.Uri;
import android.os.Environment;
import android.widget.Toast;

import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

import java.io.File;
import java.util.Map;
import java.util.HashMap;

import androidx.core.content.FileProvider;

public class RefreshModule extends ReactContextBaseJavaModule {
    RefreshModule(ReactApplicationContext context) {
        super(context);
    }

    @Override
    public String getName() {
        return "RefreshModule";
    }

    @ReactMethod
    public void createRefreshEvent(String destPath) {

//        Toast.makeText(getReactApplicationContext(), destPath, Toast.LENGTH_SHORT).show();
       Intent mediaScanIntent = new Intent(Intent.ACTION_MEDIA_SCANNER_SCAN_FILE);
       Uri contentUri = Uri.parse("file://" + destPath);
       mediaScanIntent.setData(contentUri);
       getReactApplicationContext().sendBroadcast(mediaScanIntent);

    }
}
